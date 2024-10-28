import * as React from 'react';
import { Label } from '@fluentui/react';
import './css/statusView.css';

export interface IStatusViewProps {
    status: number;
}

// Interface to be used for the status info
interface IStatusInfo {
    label: string;
    color: string;
    backgroundColor: string;
}

export const StatusView: React.FC<IStatusViewProps> = ({ status }) => {

    // Map of status codes to status info (label, color, background color)
    const statusInfoMap: Record<number, IStatusInfo> = {
        918550001: { label: 'Scheduled', color: '#000080', backgroundColor: '#cce5ff' },
        918550003: { label: 'On Hold', color: 'purple', backgroundColor: '#e5ccff' },	
        918550002: { label: 'In Progress', color: 'orange', backgroundColor: '#ffebcc' },
        918550004: { label: 'Completed', color: 'green', backgroundColor: '#ccffcc' },
    };

    // Get the status info based on the status code (if not found, use 'Unknown' label with grey color and light grey background)
    const statusInfo = statusInfoMap[status] || { label: 'Unknown', color: 'grey', backgroundColor: '#e0e0e0' };

    return (
        <div className="status-view-container">
            <Label className="status-view-maintenance-label">Maintenance</Label>
            <div
                className="status-view-status-container"
                style={{
                    backgroundColor: statusInfo.backgroundColor,
                }}
            >
                <Label 
                    className="status-view-status-label"
                    style={{
                        color: statusInfo.color
                    }}
                >
                    {statusInfo.label}
                </Label>
            </div>
        </div>
    );
};
