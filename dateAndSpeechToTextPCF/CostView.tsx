import * as React from 'react';
import { Label } from '@fluentui/react';
import './CSS/costView.css';

export interface ICostViewProps {
  cost: number;
}

export const CostView: React.FC<ICostViewProps> = ({ cost }) => {
  const [pounds, cents] = cost.toFixed(2).split('.');

  return (
    <>
      <div className="cost-container">
        <Label className="cost-label">Cost</Label>
        <div className="cost-value">
          <span className='symbol'>$</span>
          <span className="pounds">{pounds}</span>
          <span className="cents">.{cents}</span>
        </div>
      </div>
    </>
  );
};
