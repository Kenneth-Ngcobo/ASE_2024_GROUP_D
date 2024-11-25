'use client';

import { useState, useEffect, useRef } from 'react';

export default function VoiceAssistant({ instructions }) {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSpeed, setSpeechSpeed] = useState(1);
    const [error, setError] = useState(null);

    const synthRef = useRef(window.speechSynthesis); // For text-to-speech
    const recognitionRef = useRef(null); // For voice commands

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = "en-US";
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.onresult = handleVoiceCommand;
            recognition.onerror = (e) => setError(e.error);
            recognitionRef.current = recognition;
        } else {
            setError("Speech Recognition not supported in this browser.");
        }
    }, []);

    // Start the voice assistant
    const startVoiceAssistant = () => {
        setIsActive(true);
        readInstruction(); 
        recognitionRef.current?.start(); 
    };

    // Stop the voice assistant
    const stopVoiceAssistant = () => {
        setIsActive(false);
        synthRef.current.cancel();
        recognitionRef.current?.stop();
        setIsSpeaking(false);
    };

    // Read the current instruction
    const readInstruction = () => {
        if (currentStep < instructions.length) {
            const utterance = new SpeechSynthesisUtterance(instructions[currentStep]);
            utterance.rate = speechSpeed;
            utterance.onend = () => setIsSpeaking(false);
            synthRef.current.speak(utterance);
            setIsSpeaking(true);
        } else {
            speakText("You have reached the end of the instructions.");
        }
    };

    // Handle voice commands
    const handleVoiceCommand = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log("Voice Command Received:", transcript);

        if (transcript.includes("next step")) {
            goToNextStep();
        } else if (transcript.includes("previous step")) {
            goToPreviousStep();
        } else if (transcript.includes("repeat step")) {
            readInstruction();
        } else if (transcript.includes("pause")) {
            pauseSpeech();
        } else if (transcript.includes("resume")) {
            resumeSpeech();
        } else if (transcript.includes("stop")) {
            stopVoiceAssistant();
        } else {
            speakText("Command not recognized. Please try again.");
        }
    };

    // Pause speech synthesis
    const pauseSpeech = () => {
        synthRef.current.pause();
    };

    // Resume speech synthesis
    const resumeSpeech = () => {
        synthRef.current.resume();
    };

    // Move to the next step
    const goToNextStep = () => {
        if (currentStep < instructions.length - 1) {
            setCurrentStep((prev) => prev + 1);
            readInstruction();
        } else {
            speakText("You are already at the last step.");
        }
    };

    // Move to the previous step
    const goToPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
            readInstruction();
        } else {
            speakText("You are already at the first step.");
        }
    };

    // Speak custom text
    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speechSpeed;
        synthRef.current.speak(utterance);
    };

    return (
        <div className="mt-5">
            <h3 className='text-gray-600'>Voice Assistant</h3>
            {error && <p className="error">{error}</p>}
            {!isActive ? (
                <button onClick={startVoiceAssistant} className="bg-blue-500 text-gray-600 p-1 rounded-md">
                    Start Voice Assistance
                </button>
            ) : (
                <div>
                    <p>Current Step: {currentStep + 1}</p>
                    <p>{instructions[currentStep]}</p>
                    <button onClick={readInstruction} disabled={isSpeaking}>
                        Read Step
                    </button>
                    <button onClick={pauseSpeech}>Pause</button>
                    <button onClick={resumeSpeech}>Resume</button>
                    <button onClick={goToNextStep}>Next Step</button>
                    <button onClick={goToPreviousStep}>Previous Step</button>
                    <button onClick={stopVoiceAssistant}>Stop</button>
                    <label>
                        Speed:
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speechSpeed}
                            onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}