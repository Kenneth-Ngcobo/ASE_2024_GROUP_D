"use client"
import { useState, useEffect } from "react";

/**
 * Custom hook to handle voice recording and transcription.
 *
 * @returns {Object} An object containing:
 *  - {boolean} isRecording - Whether recording is in progress.
 *  - {string} transcript - The transcribed text.
 *  - {string|null} error - Any error message.
 *  - {Function} startRecording - Function to start the voice recording.
 */
export default function useRecordVoice() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setError("Speech Recognition API is not supported in your browser.");
    }
  }, []);

  const startRecording = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US"; // Set language
    recognition.interimResults = false; // Only final results
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onspeechend = () => {
      recognition.stop();
      setIsRecording(false);
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onerror = (event) => {
      setError(event.error);
      setIsRecording(false);
    };

    recognition.start();
  };

  return {
    isRecording,
    transcript,
    error,
    startRecording,
  };
}
