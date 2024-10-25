import * as React from 'react';
import { FlipCounter } from './FlipCounter';
import { VoiceInput } from './VoiceInput';
import { StatusView } from './StatusView';
import { CostView } from './CostView';
import './css/containerPCF.css';

export interface IContainerPCFProps {
    daysPassed: number;
    onSpeechResult: (transcript: string) => void; // Function to send speech result to index.ts
    status: number;
    cost: number;
}

export const ContainerPCF: React.FC<IContainerPCFProps> = ({ daysPassed, onSpeechResult, status, cost }) => {
    return (
        <>
            <div className="flex-container">
                <div className="featureContainer">
                    <VoiceInput onSpeechResult={onSpeechResult} />
                </div>
                <div className="featureContainer">
                    <FlipCounter daysPassed={daysPassed} />
                </div>
                <div className="featureContainer">
                    <StatusView status={status} />
                </div>
                <div className="featureContainer">
                    <CostView cost={cost} />
                </div>
            </div>
        </>
    );
};
