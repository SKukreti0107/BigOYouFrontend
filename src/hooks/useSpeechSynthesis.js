import { useState, useEffect, useRef } from "react";
import { cleanTextForSpeech } from "../helpers/speechHelpers";

/**
 * Custom hook to interface with the browser's native Text-to-Speech (SpeechSynthesis) engine.
 * Supports speaking cleaned text, stopping/canceling speech, and toggling mute preferences
 * persisted in localStorage.
 */
export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem("interview.tts.muted") === "true";
    } catch {
      return false;
    }
  });
  const currentUtteranceRef = useRef(null);

  // Sync mute state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("interview.tts.muted", isMuted.toString());
    } catch (err) {
      console.warn("Could not save mute preference to localStorage", err);
    }
    if (isMuted) {
      cancel();
    }
  }, [isMuted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  const speak = (rawText) => {
    if (isMuted || !window.speechSynthesis) return;

    // Stop any ongoing speech first
    cancel();

    const cleanedText = cleanTextForSpeech(rawText);
    if (!cleanedText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanedText);
      currentUtteranceRef.current = utterance;

      // Select an elegant, premium English voice if available
      const voices = window.speechSynthesis.getVoices();
      const premiumVoice = voices.find(
        (v) => v.lang.startsWith("en-") && v.name.includes("Google")
      ) || voices.find((v) => v.lang.startsWith("en-") && v.name.includes("Natural"))
        || voices.find((v) => v.lang.startsWith("en-"));

      if (premiumVoice) {
        utterance.voice = premiumVoice;
      }
      
      // Speed up slightly for a natural tech interviewer pace
      utterance.rate = 1.05;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        // "interrupted" is raised normally when we trigger speechSynthesis.cancel()
        if (event.error !== "interrupted") {
          console.warn("Speech Synthesis playback error:", event);
        }
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Failed to start speech synthesis:", err);
      setIsSpeaking(false);
      currentUtteranceRef.current = null;
    }
  };

  const cancel = () => {
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn("Failed to cancel speech synthesis:", err);
      }
    }
    setIsSpeaking(false);
    currentUtteranceRef.current = null;
  };

  return {
    speak,
    cancel,
    isSpeaking,
    isMuted,
    setIsMuted,
    isSupported: !!window.speechSynthesis
  };
}
