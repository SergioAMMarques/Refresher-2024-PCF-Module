import * as React from 'react';
import { Label } from '@fluentui/react';

export interface IStatusViewProps {
    status: number;
}

interface IStatusInfo {
    label: string;
    color: string;
}

export const StatusView: React.FC<IStatusViewProps> = ({ status }) => {
    const statusInfoMap: Record<number, IStatusInfo> = {
        918550001: { label: 'Scheduled', color: 'blue' },
        918550002: { label: 'In Progress', color: 'orange' },
        918550004: { label: 'Completed', color: 'green' },
    };

    const statusInfo = statusInfoMap[status] || { label: 'Unknown', color: 'grey' };

    // Function to get a lighter version of the color by adding transparency
    const getLighterColor = (color: string) => {
        switch (color) {
            case 'blue':
                return '#cce5ff'; // Lighter blue
            case 'orange':
                return '#ffebcc'; // Lighter orange
            case 'green':
                return '#ccffcc'; // Lighter green
            case 'grey':
                return '#e0e0e0'; // Lighter grey
            default:
                return '#f0f0f0'; // Fallback light color
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '10px' }}>
            {/* Label for Maintenance */}
            <Label style={{ fontSize: '18px', fontWeight: 'bold' }}>Maintenance</Label>
            
            {/* Status Container */}
            <div
                style={{
                    marginTop: '10px',
                    padding: '5px 15px',
                    borderRadius: '10px',
                    border: `2px solid ${statusInfo.color}`,
                    backgroundColor: getLighterColor(statusInfo.color),  // Lighter background color
                    display: 'inline-block'
                }}
            >
                <Label style={{ color: statusInfo.color, fontWeight: 'bold' }}>
                    {statusInfo.label}
                </Label>
            </div>
        </div>
    );
};
