import { useState, useRef, useEffect } from 'react';

const useSpeechToText = () => {

    // State to manage the listening state of the speech recognition
    const [isListening, setIsListening] = useState(false);

    // State to manage the transcript of the speech recognition
    const [transcript, setTranscript] = useState("");

    // Reference to the SpeechRecognition object
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // Effect to initialize the SpeechRecognition object and set the event handlers for the speech recognition events
    useEffect(() => {
        // Check if the SpeechRecognition API is supported in the browser
        if (!('webkitSpeechRecognition' in window)) {
            console.error("Speech Recognition is not supported in this browser");
            return;
        }

        // Initialize the SpeechRecognition object
        recognitionRef.current = new window.webkitSpeechRecognition();

        // Get the SpeechRecognition object from the ref object
        const recognition = recognitionRef.current;

        // Set the properties of the SpeechRecognition object for interim results
        recognition.interimResults = true;

        // Set the properties of the SpeechRecognition object for continuous recognition
        recognition.continuous = true;

        // Set the language of the recognition to British English
        recognition.lang = "en-GB";

        // Add a grammar for punctuation recognition
        if ("webkitSpeechGrammarList" in window) {
            const grammar = "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
            const speechRecognitionList = new window.webkitSpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }

        // Event handler when the speech recognition returns a result (interim or final)
        recognition.onresult = (event) => {
            let text = "";
            for (let i = 0; i < event.results.length; i++) {
                text += event.results[i][0].transcript;
            }
            setTranscript(text);
        }

        // Event handler when the speech recognition encounters an error (e.g., no-speech, audio-capture, not-allowed)
        recognition.onerror = (event) => {
            console.error("Speech Recognition Error: ", event.error);
        }

        // Event handler when the speech recognition ends (e.g., stopped by the user)
        recognition.onend = () => {
            setIsListening(false);
            setTranscript("");
        }

        return () => {
            recognition.stop();
        }

    }, []);

    // Function to start the speech recognition
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    }

    // Function to stop the speech recognition
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }

    return {
        isListening,
        transcript,
        startListening,
        stopListening
    }
}

export default useSpeechToText