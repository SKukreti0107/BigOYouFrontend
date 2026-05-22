import { useState, useEffect, useRef } from "react";
import api from "../components/Api";

/**
 * A highly robust custom hook to record audio locally using HTML5 MediaRecorder
 * and transcribe it via the backend's Groq Whisper API endpoint.
 *
 * Exposes a robust, drop-in replacement API for standard SpeechRecognition.
 *
 * @param {Object} params
 * @param {Function} params.onTranscriptChange - Callback triggered with the final transcribed text
 * @param {Function} [params.onStop] - Optional callback triggered when recording stops
 */
export function useSpeechRecognition({ onTranscriptChange, onStop }) {
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recognitionError, setRecognitionError] = useState("");

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const onTranscriptChangeRef = useRef(onTranscriptChange);
  const onStopRef = useRef(onStop);

  useEffect(() => {
    onTranscriptChangeRef.current = onTranscriptChange;
  }, [onTranscriptChange]);

  useEffect(() => {
    onStopRef.current = onStop;
  }, [onStop]);

  // Clean up streams and recorders on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        // Already stopped or inactive
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    chunksRef.current = [];
  };

  const startListening = async () => {
    try {
      cleanup();
      setRecognitionError("");
      setIsTranscribing(false);

      // Cancel any ongoing AI Text-to-Speech output to prevent recording it
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Determine standard mime type supported by the browser
      let mimeType = "audio/webm";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "audio/ogg";
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "audio/mp4";
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = ""; // Let the browser choose its default
      }

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Compile the audio chunks
        const audioBlob = new Blob(chunksRef.current, {
          type: mediaRecorder.mimeType || "audio/webm",
        });

        if (audioBlob.size === 0) {
          setRecognitionError("No audio was recorded.");
          setIsTranscribing(false);
          setIsListening(false);
          return;
        }

        // Trigger transcription via FastAPI backend Groq proxy
        await transcribeAudioBlob(audioBlob);

        // Turn off stream tracks to disable mic indicator in browser
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }

        setIsListening(false);
        if (onStopRef.current) {
          onStopRef.current();
        }
      };

      mediaRecorder.start(250); // Capture in chunks every 250ms
      setIsListening(true);
    } catch (err) {
      console.error("Failed to start MediaRecorder speech recognition:", err);
      let userMsg = "Could not access microphone.";
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        userMsg = "Microphone access denied. Please enable mic permissions in your browser.";
      }
      setRecognitionError(userMsg);
      setIsListening(false);
    }
  };

  const transcribeAudioBlob = async (audioBlob) => {
    setIsTranscribing(true);
    setRecognitionError("");

    const formData = new FormData();
    // Guess file extension from mime type
    let extension = "webm";
    if (audioBlob.type.includes("ogg")) extension = "ogg";
    if (audioBlob.type.includes("mp4")) extension = "mp4";
    if (audioBlob.type.includes("wav")) extension = "wav";

    formData.append("file", audioBlob, `recording.${extension}`);

    try {
      const res = await api.post("/interview/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 25000,
      });

      const transcript = res?.data?.text || "";
      if (transcript.trim() && onTranscriptChangeRef.current) {
        onTranscriptChangeRef.current(transcript.trim());
      } else if (!transcript.trim()) {
        setRecognitionError("Whisper could not hear any speech. Please speak clearly.");
      }
    } catch (err) {
      console.error("Groq transcription API failed:", err);
      let errorDetail = "Failed to connect to transcription service.";
      if (err.response?.data?.detail) {
        errorDetail = err.response.data.detail;
      }
      setRecognitionError(errorDetail);
    } finally {
      setIsTranscribing(false);
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.warn("Failed to stop MediaRecorder:", err);
        setIsListening(false);
      }
    } else {
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    isListening,
    isTranscribing,
    recognitionError,
    startListening,
    stopListening,
    toggleListening,
    isSupported: !!(
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      window.MediaRecorder
    ),
  };
}
