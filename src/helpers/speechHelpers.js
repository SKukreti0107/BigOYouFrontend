/**
 * Cleans markdown formatting, code snippets, and structural syntax
 * to make the text sound natural when spoken by a Text-to-Speech engine.
 *
 * @param {string} text - The raw message content from the AI interviewer.
 * @returns {string} The cleaned text suitable for speech synthesis.
 */
export function cleanTextForSpeech(text) {
  if (!text) return "";

  return text
    // 1. Remove markdown code blocks (e.g., ```python ... ```)
    .replace(/```[\s\S]*?```/g, "[Code snippet omitted]")
    // 2. Remove inline code snippets (e.g., `O(N)`) but keep the text
    .replace(/`([^`]+)`/g, "$1")
    // 3. Remove bold/italics markers (e.g., **Approach 1:** or *Note*)
    .replace(/[\*\#\_]/g, "")
    // 4. Remove bullet list markers
    .replace(/^\s*[-\*\+]\s+/gm, "")
    // 5. Replace multiple spaces and newlines with a single space
    .replace(/\s+/g, " ")
    .trim();
}
