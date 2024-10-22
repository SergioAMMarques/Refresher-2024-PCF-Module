// FlipCounter.tsx
import * as React from 'react';
import { Label } from '@fluentui/react';
import './CSS/flipCounter.css';
import { FlipUnitContainer } from './FlipClockComponents';

export interface IFlipCounterProps {
  startDate?: Date;
}

export interface IFlipCounterState {
  daysPassed: number;
  previousDaysPassed: number;
  digits: string[];
  previousDigits: string[];
  shuffles: boolean[];
}

export class FlipCounter extends React.Component<IFlipCounterProps, IFlipCounterState> {
  private interval: NodeJS.Timeout | null = null;

  constructor(props: IFlipCounterProps) {
    super(props);

    const startDate = props.startDate || new Date();
    const daysPassed = this.calculateDaysPassed(startDate);
    const digits = this.getDigits(daysPassed);

    this.state = {
      daysPassed,
      previousDaysPassed: daysPassed,
      digits,
      previousDigits: digits,
      shuffles: digits.map(() => false),
    };
  }

  componentDidMount() {
    // Update daysPassed every day
    this.interval = setInterval(() => {
      this.updateDaysPassed();
    }, 1000 * 60 * 60 * 24); // Every day
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  componentDidUpdate(prevProps: IFlipCounterProps) {
    if (prevProps.startDate !== this.props.startDate) {
      const startDate = this.props.startDate || new Date();
      const daysPassed = this.calculateDaysPassed(startDate);

      // Get previous and current digits
      const previousDigits = this.state.digits;
      const digits = this.getDigits(daysPassed);

      const maxLength = Math.max(previousDigits.length, digits.length, 2); // Ensure at least length 2

      const paddedPreviousDigits = this.padDigitsArray(previousDigits, maxLength);
      const paddedDigits = this.padDigitsArray(digits, maxLength);

      // Determine which digits have changed
      const shuffles = paddedDigits.map((digit, index) => digit !== paddedPreviousDigits[index]);

      this.setState({
        daysPassed,
        previousDaysPassed: this.state.daysPassed,
        digits: paddedDigits,
        previousDigits: paddedPreviousDigits,
        shuffles,
      });
    }
  }

  updateDaysPassed() {
    const startDate = this.props.startDate || new Date();
    const daysPassed = this.calculateDaysPassed(startDate);

    // Get previous and current digits
    const previousDigits = this.state.digits;
    const digits = this.getDigits(daysPassed);

    const maxLength = Math.max(previousDigits.length, digits.length, 2); // Ensure at least length 2

    const paddedPreviousDigits = this.padDigitsArray(previousDigits, maxLength);
    const paddedDigits = this.padDigitsArray(digits, maxLength);

    // Determine which digits have changed
    const shuffles = paddedDigits.map((digit, index) => digit !== paddedPreviousDigits[index]);

    this.setState({
      daysPassed,
      previousDaysPassed: this.state.daysPassed,
      digits: paddedDigits,
      previousDigits: paddedPreviousDigits,
      shuffles,
    });
  }

  getDigits(num: number): string[] {
    const strNum = num.toString().padStart(2, '0'); // Ensure at least two digits
    return strNum.split(''); // Return each digit as an array item
  }

  padDigitsArray(arr: string[], length: number): string[] {
    const padded = arr.slice();
    while (padded.length < length) {
      padded.unshift('0');
    }
    return padded;
  }

  calculateDaysPassed(startDate: Date): number {
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Return full days passed
  }

  render() {
    return (
      <div className="flip-counter">
        <div className="flipClock">
          {this.state.digits.map((digit, index) => (
            <FlipUnitContainer
              key={index}
              digit={digit}
              previousDigit={this.state.previousDigits[index]}
              shuffle={this.state.shuffles[index]}
            />
          ))}
        </div>
        <Label>Days Since Start</Label>
      </div>
    );
  }
}
