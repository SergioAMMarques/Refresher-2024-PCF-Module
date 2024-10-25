import * as React from 'react';
import { Label } from '@fluentui/react';
import './css/statusView.css';

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
        <div className="status-view-container">
            <Label className="status-view-maintenance-label">Maintenance</Label>
            <div
                className="status-view-status-container"
                style={{
                    backgroundColor: getLighterColor(statusInfo.color)
                }}
            >
                <Label className="status-view-status-label" style={{ color: statusInfo.color }}>
                    {statusInfo.label}
                </Label>
            </div>
        </div>
    );
};
