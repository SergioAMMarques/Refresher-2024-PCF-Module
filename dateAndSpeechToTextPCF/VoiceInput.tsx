import * as React from 'react';
import useSpeechToText from './Hook/useSpeechToText';
import './css/voiceInput.css';

interface IVoiceInputProps {
    onSpeechResult: (transcript: string) => void;
}

export const VoiceInput: React.FC<IVoiceInputProps> = ({ onSpeechResult }) => {
    const { isListening, transcript, startListening, stopListening } = useSpeechToText();
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isSpeaking, setIsSpeaking] = React.useState(false);

    // Set isSpeaking true briefly upon detecting new transcript
    React.useEffect(() => {
        if (transcript) {
            setIsSpeaking(true);
            const speakingTimeout = setTimeout(() => setIsSpeaking(false), 1000); // 1-second timeout to reset

            return () => clearTimeout(speakingTimeout); // Clear timeout if transcript updates
        }
    }, [transcript]);

    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening();
    };

    const stopVoiceInput = () => {
        if (transcript) {
            onSpeechResult(transcript);
        }
        stopListening();
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="voice-input">
            <button
                onClick={() => {
                    toggleExpand();
                    startStopListening();
                }}
                aria-label="Voice Input"
                className={`${isExpanded ? 'expanded' : ''}`}
            >
                {!isExpanded && (
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.25 11a.75.75 0 0 1 .743.648l.007.102v.5a6.75 6.75 0 0 1-6.249 6.732l-.001 2.268a.75.75 0 0 1-1.493.102l-.007-.102v-2.268a6.75 6.75 0 0 1-6.246-6.496L5 12.25v-.5a.75.75 0 0 1 1.493-.102l.007.102v.5a5.25 5.25 0 0 0 5.034 5.246l.216.004h.5a5.25 5.25 0 0 0 5.246-5.034l.004-.216v-.5a.75.75 0 0 1 .75-.75ZM12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z" fill="#3D556E"/>
                    </svg>
                )}
                {isExpanded && (
                    <>
                        <div className='dismiss-button'>
                            {/* Dismiss Button Content */}
                        </div>
                        <div
                            className={`transcript-box ${isSpeaking ? 'speaking' : ''}`}
                            style={{
                                boxShadow: isSpeaking
                                    ? '0 0 15px rgba(0, 128, 255, 0.8)'
                                    : '0 0 8px rgba(0, 128, 255, 0.5)',
                            }}
                        >
                            <p>{transcript}</p>
                        </div>
                    </>
                )}
            </button>
        </div>
    );
};
