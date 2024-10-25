import * as React from 'react';
import useSpeechToText from './Hook/useSpeechToText';
import './css/voiceInput.css';

interface IVoiceInputProps {
    onSpeechResult: (transcript: string) => void;
    status: number;
    startDate: Date | null;
}

export const VoiceInput: React.FC<IVoiceInputProps> = ({ onSpeechResult, status, startDate }) => {

    // Use the custom hook to get the speech-to-text functionality
    const { isListening, transcript, startListening, stopListening } = useSpeechToText();

    // State to manage the expanded state of the voice input
    const [isExpanded, setIsExpanded] = React.useState(false);

    // State to manage the speaking state of the voice input
    const [isSpeaking, setIsSpeaking] = React.useState(false);

    // Effect to manage the speaking state of the voice input
    React.useEffect(() => {
        // If there is a transcript, set speaking to true and reset after 1 second
        if (transcript) {
            setIsSpeaking(true);
            const speakingTimeout = setTimeout(() => setIsSpeaking(false), 1000); // 1-second timeout to reset

            return () => clearTimeout(speakingTimeout); // Clear timeout if transcript updates
        }
    }, [transcript]);

    // Function to start or stop listening
    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening();
    };

    // Function to stop voice input and send the transcript to the parent component
    const stopVoiceInput = () => {
        if (transcript) {
            onSpeechResult(transcript);
        }
        stopListening();
    };

    // Function to toggle the expanded state of the voice input
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Function to dismiss the voice input and stop listening
    const handleDismiss = () => {
        stopVoiceInput();
        stopListening(); // Ensure listening fully stops
        setIsExpanded(false);
    };

    return (
        <div className="voice-input">
            <button disabled={status === 918550004 || !startDate}
                onClick={() => {
                    toggleExpand();
                    startStopListening();
                }}
                className={`${isExpanded ? 'expanded' : ''}`}
            >
                {!isExpanded && (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.25 11a.75.75 0 0 1 .743.648l.007.102v.5a6.75 6.75 0 0 1-6.249 6.732l-.001 2.268a.75.75 0 0 1-1.493.102l-.007-.102v-2.268a6.75 6.75 0 0 1-6.246-6.496L5 12.25v-.5a.75.75 0 0 1 1.493-.102l.007.102v.5a5.25 5.25 0 0 0 5.034 5.246l.216.004h.5a5.25 5.25 0 0 0 5.246-5.034l.004-.216v-.5a.75.75 0 0 1 .75-.75ZM12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" fill="#212121"/></svg>
                )}
                {isExpanded && (
                    <>
                        <div className='dismiss-button'>
                            <button className='buttonDismiss' onClick={handleDismiss}>
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.21 4.387.083-.094a1 1 0 0 1 1.32-.083l.094.083L12 10.585l6.293-6.292a1 1 0 1 1 1.414 1.414L13.415 12l6.292 6.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083L12 13.415l-6.293 6.292a1 1 0 0 1-1.414-1.414L10.585 12 4.293 5.707a1 1 0 0 1-.083-1.32l.083-.094-.083.094Z" fill="#212121"/></svg>
                            </button>
                        </div>
                        <div className={`transcript-box ${isSpeaking ? 'speaking' : ''}`}>
                            <p>{transcript}</p>
                        </div>
                    </>
                )}
            </button>
        </div>
    );
};
