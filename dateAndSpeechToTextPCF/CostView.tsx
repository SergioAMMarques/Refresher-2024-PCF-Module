import * as React from 'react'
import { Label } from '@fluentui/react';

export interface ICostViewProps {
    cost: number;
}

export const CostView: React.FC<ICostViewProps> = ({cost}) => {
  return (
    <>
        <div className="cost-container">
            <Label style={{ fontSize: '18px', fontWeight: 'bold' }}>Cost</Label>
            <Label style={{ fontSize: '24px', fontWeight: 'bold' }}>£{cost.toFixed(2)}</Label>
        </div>
    </>
  )
}