import * as React from 'react';
import useSpeechToText from './Hook/useSpeechToText';

interface IVoiceInputProps {
    onSpeechResult: (transcript: string) => void; // Callback to send the speech result back to index.ts
}

export const VoiceInput: React.FC<IVoiceInputProps> = ({ onSpeechResult }) => {
    const { isListening, transcript, startListening, stopListening } = useSpeechToText();

    // Start or stop the voice input
    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening();
    };

    // Stop the voice input and send the transcript back
    const stopVoiceInput = () => {
        // If there's a transcript, send it back via the callback function
        if (transcript) {
            onSpeechResult(transcript);
        }
        stopListening();
    };

    return (
        <div className="voice-input">
            <button onClick={startStopListening}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <p>{transcript}</p>
        </div>
    );
};
