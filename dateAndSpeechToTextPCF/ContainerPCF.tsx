import * as React from 'react';
import { FlipCounter } from './FlipCounter';
import { VoiceInput } from './VoiceInput';

export interface IContainerPCFProps {
    daysPassed: number;
    onSpeechResult: (transcript: string) => void; // Function to send speech result to index.ts
}

export const ContainerPCF: React.FC<IContainerPCFProps> = ({ daysPassed, onSpeechResult }) => {
    return (
        <>
            <div className="flex-container">
                <div>
                    <VoiceInput onSpeechResult={onSpeechResult} />
                </div>
                <div className='daysCounter'>
                    <FlipCounter daysPassed={daysPassed} />
                </div>
            </div>
        </>
    );
};
