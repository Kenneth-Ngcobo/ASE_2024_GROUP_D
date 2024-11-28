'use client';

import { useState, useEffect, useRef } from 'react';

export default function VoiceAssistant({ instructions }) {
    const [isActive, setIsActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // Track if instructions are being played sequentially
    const [speechSpeed, setSpeechSpeed] = useState(1);
    const [error, setError] = useState(null);

    const synthRef = useRef(null); // For text-to-speech
    const recognitionRef = useRef(null); // For voice commands
    const playIntervalRef = useRef(null); // Ref to store the playback interval

    // Initialize speech synthesis and recognition
    useEffect(() => {
        // Initialize speech synthesis
        synthRef.current = window.speechSynthesis;

        // Initialize speech recognition
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
    }, []); // Runs only once on the client

    // Reset the current step if instructions change
    useEffect(() => {
        if (currentStep >= instructions.length) {
            setCurrentStep(0); // Reset to the beginning
        }
    }, [instructions]);

    // Start the voice assistant
    const startVoiceAssistant = () => {
        setIsActive(true);
        recognitionRef.current?.start();
    };

    // Stop the voice assistant
    const stopVoiceAssistant = () => {
        setIsActive(false);
        synthRef.current.cancel();
        recognitionRef.current?.stop();
        setIsSpeaking(false);
        stopPlayingInstructions(); // Stop sequential playback
    };

    // Read the current instruction
    const readInstruction = () => {
        synthRef.current.cancel(); // Stop ongoing speech
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

    // Sequentially play instructions with a delay
    const playInstructions = () => {
        stopPlayingInstructions(); // Clear any previous playback
        setIsPlaying(true);
        let step = currentStep; // Start from the current step
    
        const speakStep = (index) => {
            if (index < instructions.length) {
                const utterance = new SpeechSynthesisUtterance(instructions[index]);
                utterance.rate = speechSpeed;
                utterance.onend = () => {
                    setCurrentStep((prev) => prev + 1); // Update the step in state
                    speakStep(index + 1); // Move to the next step
                };
                utterance.onerror = (e) => {
                    console.error("Error with speech synthesis:", e);
                    setIsPlaying(false);
                };
                synthRef.current.speak(utterance);
            } else {
                stopPlayingInstructions();
                speakText("All instructions have been played.");
            }
        };
    
        speakStep(step); // Start speaking from the current step
    };

    // Stop sequential playback
    const stopPlayingInstructions = () => {
        if (playIntervalRef.current) {
            clearInterval(playIntervalRef.current);
            playIntervalRef.current = null;
        }
        setIsPlaying(false);
    };

    // Handle voice commands
    const handleVoiceCommand = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log("Voice Command Received:", transcript);

        if (transcript.includes("next step")) {
            stopPlayingInstructions(); // Stop sequential playback if a manual command is given
            goToNextStep();
        } else if (transcript.includes("previous step")) {
            stopPlayingInstructions();
            goToPreviousStep();
        } else if (transcript.includes("repeat step")) {
            stopPlayingInstructions();
            readInstruction();
        } else if (transcript.includes("pause")) {
            pauseSpeech();
        } else if (transcript.includes("resume")) {
            resumeSpeech();
        } else if (transcript.includes("play")) {
            playInstructions();
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
        synthRef.current.cancel(); // Stop ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speechSpeed;
        synthRef.current.speak(utterance);
    };

    return (
        <div className="mt-5">
            <h3 className="text-gray-600 font-semibold text-lg">Voice Assistant</h3>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {!isActive ? (
                <button 
                    onClick={startVoiceAssistant} 
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all">
                    Start Voice Assistance
                </button>
            ) : (
                <div>
                    <p className="mt-2 text-gray-600">Current Step: {currentStep + 1}</p>
                    <p className="text-gray-700 font-medium mb-3">{instructions[currentStep]}</p>
                    <div className="flex gap-2 flex-wrap">
                        <button 
                            onClick={playInstructions} 
                            disabled={isPlaying}
                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:opacity-50 transition-all">
                            Play Instructions
                        </button>
                        <button 
                            onClick={pauseSpeech} 
                            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all">
                            Pause
                        </button>
                        <button 
                            onClick={resumeSpeech} 
                            className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all">
                            Resume
                        </button>
                        <button 
                            onClick={goToNextStep} 
                            className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition-all">
                            Next Step
                        </button>
                        <button 
                            onClick={goToPreviousStep} 
                            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all">
                            Previous Step
                        </button>
                        <button 
                            onClick={stopVoiceAssistant} 
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all">
                            Stop
                        </button>
                    </div>
                    <label className="mt-3 block">
                        <span className="text-gray-600 font-medium">Speed:</span>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speechSpeed}
                            onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                            className="ml-2"
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
// 'use client';

// import { useState, useEffect, useRef } from 'react';

// export default function VoiceAssistant({ instructions }) {
//     const [isActive, setIsActive] = useState(false);
//     const [currentStep, setCurrentStep] = useState(0);
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(false); // Track if instructions are being played sequentially
//     const [speechSpeed, setSpeechSpeed] = useState(1);
//     const [error, setError] = useState(null);

//     const synthRef = useRef(window.speechSynthesis); // For text-to-speech
//     const recognitionRef = useRef(null); // For voice commands
//     const playIntervalRef = useRef(null); // Ref to store the playback interval

//     // Initialize speech recognition
//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//         if (SpeechRecognition) {
//             const recognition = new SpeechRecognition();
//             recognition.lang = "en-US";
//             recognition.continuous = true;
//             recognition.interimResults = false;
//             recognition.onresult = handleVoiceCommand;
//             recognition.onerror = (e) => setError(e.error);
//             recognitionRef.current = recognition;
//         } else {
//             setError("Speech Recognition not supported in this browser.");
//         }
//     }, []);

//     // Start the voice assistant
//     const startVoiceAssistant = () => {
//         setIsActive(true);
//         recognitionRef.current?.start();
//     };

//     // Stop the voice assistant
//     const stopVoiceAssistant = () => {
//         setIsActive(false);
//         synthRef.current.cancel();
//         recognitionRef.current?.stop();
//         setIsSpeaking(false);
//         stopPlayingInstructions(); // Stop sequential playback
//     };

//     // Read the current instruction
//     const readInstruction = () => {
//         if (currentStep < instructions.length) {
//             const utterance = new SpeechSynthesisUtterance(instructions[currentStep]);
//             utterance.rate = speechSpeed;
//             utterance.onend = () => setIsSpeaking(false);
//             synthRef.current.speak(utterance);
//             setIsSpeaking(true);
//         } else {
//             speakText("You have reached the end of the instructions.");
//         }
//     };

//     // Sequentially play instructions with a delay
//     const playInstructions = () => {
//         stopPlayingInstructions(); // Clear any previous intervals
//         setIsPlaying(true);
//         playIntervalRef.current = setInterval(() => {
//             if (currentStep < instructions.length) {
//                 readInstruction();
//                 setCurrentStep((prevStep) => prevStep + 1);
//             } else {
//                 stopPlayingInstructions();
//                 speakText("All instructions have been played.");
//             }
//         }, 2000);
//     };

//     // Stop sequential playback
//     const stopPlayingInstructions = () => {
//         if (playIntervalRef.current) {
//             clearInterval(playIntervalRef.current);
//             playIntervalRef.current = null;
//         }
//         setIsPlaying(false);
//     };

//     // Handle voice commands
//     const handleVoiceCommand = (event) => {
//         const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
//         console.log("Voice Command Received:", transcript);

//         if (transcript.includes("next step")) {
//             stopPlayingInstructions(); // Stop sequential playback if a manual command is given
//             goToNextStep();
//         } else if (transcript.includes("previous step")) {
//             stopPlayingInstructions();
//             goToPreviousStep();
//         } else if (transcript.includes("repeat step")) {
//             stopPlayingInstructions();
//             readInstruction();
//         } else if (transcript.includes("pause")) {
//             pauseSpeech();
//         } else if (transcript.includes("resume")) {
//             resumeSpeech();
//         } else if (transcript.includes("play")) {
//             playInstructions();
//         } else if (transcript.includes("stop")) {
//             stopVoiceAssistant();
//         } else {
//             speakText("Command not recognized. Please try again.");
//         }
//     };

//     // Pause speech synthesis
//     const pauseSpeech = () => {
//         synthRef.current.pause();
//     };

//     // Resume speech synthesis
//     const resumeSpeech = () => {
//         synthRef.current.resume();
//     };

//     // Move to the next step
//     const goToNextStep = () => {
//         if (currentStep < instructions.length - 1) {
//             setCurrentStep((prev) => prev + 1);
//             readInstruction();
//         } else {
//             speakText("You are already at the last step.");
//         }
//     };

//     // Move to the previous step
//     const goToPreviousStep = () => {
//         if (currentStep > 0) {
//             setCurrentStep((prev) => prev - 1);
//             readInstruction();
//         } else {
//             speakText("You are already at the first step.");
//         }
//     };

//     // Speak custom text
//     const speakText = (text) => {
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.rate = speechSpeed;
//         synthRef.current.speak(utterance);
//     };

//     return (
//         <div className="mt-5">
//             <h3 className="text-gray-600 font-semibold text-lg">Voice Assistant</h3>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//             {!isActive ? (
//                 <button 
//                     onClick={startVoiceAssistant} 
//                     className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all">
//                     Start Voice Assistance
//                 </button>
//             ) : (
//                 <div>
//                     <p className="mt-2 text-gray-600">Current Step: {currentStep + 1}</p>
//                     <p className="text-gray-700 font-medium mb-3">{instructions[currentStep]}</p>
//                     <div className="flex gap-2 flex-wrap">
//                         <button 
//                             onClick={playInstructions} 
//                             disabled={isPlaying}
//                             className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:opacity-50 transition-all">
//                             Play Instructions
//                         </button>
//                         <button 
//                             onClick={pauseSpeech} 
//                             className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all">
//                             Pause
//                         </button>
//                         <button 
//                             onClick={resumeSpeech} 
//                             className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-all">
//                             Resume
//                         </button>
//                         <button 
//                             onClick={goToNextStep} 
//                             className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 transition-all">
//                             Next Step
//                         </button>
//                         <button 
//                             onClick={goToPreviousStep} 
//                             className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all">
//                             Previous Step
//                         </button>
//                         <button 
//                             onClick={stopVoiceAssistant} 
//                             className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all">
//                             Stop
//                         </button>
//                     </div>
//                     <label className="mt-3 block">
//                         <span className="text-gray-600 font-medium">Speed:</span>
//                         <input
//                             type="range"
//                             min="0.5"
//                             max="2"
//                             step="0.1"
//                             value={speechSpeed}
//                             onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
//                             className="ml-2"
//                         />
//                     </label>
//                 </div>
//             )}
//         </div>
//     );
// }