import * as React from 'react';
import { FlipCounter } from './FlipCounter';
import { VoiceInput } from './VoiceInput';
import { StatusView } from './StatusView';

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

                        .control-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: fit-content;
                            height: fit-content;
                            padding: 1rem;
                        }

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
                    
                </div>
            </div>
        </>
    );
};
