import * as React from 'react';
import { FlipCounter } from './FlipCounter';
import { VoiceInput } from './VoiceInput';
import { StatusView } from './StatusView';
import { CostView } from './CostView';

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
                <style>
                    {`

                        .flex-container {
                            display: flex;
                            width: fit-content;
                            height: fit-content;
                        }
                    `}
                </style>
                <div>
                    <VoiceInput onSpeechResult={onSpeechResult} />
                </div>
                <div className='daysCounter'>
                    <FlipCounter daysPassed={daysPassed} />
                </div>
                <div className='maintenanceStatus'>
                    <StatusView  status={status}/>
                </div>
                <div className='maintenanceCost'>
                    <CostView cost={cost} />
                </div>
            </div>
        </>
    );
};
