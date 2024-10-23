import * as React from 'react';
import { FlipCounter } from './FlipCounter';
import { VoiceInput } from './VoiceInput';

export interface IContainerPCFProps {
    daysPassed: number;
}

export const ContainerPCF: React.FC<IContainerPCFProps> = ({ daysPassed }) => {
    return (
        <>
            <div className="flex-container">
                <div>
                    <VoiceInput />
                </div>
                <div className='daysCounter'>
                    <FlipCounter daysPassed={daysPassed} />
                </div>
            </div>
        </>
    );
};
