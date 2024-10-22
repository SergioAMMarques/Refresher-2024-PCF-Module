import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Label } from '@fluentui/react';
import './CSS/flipCounter.css';
import { FlipUnitContainer } from './FlipClockComponents';

export interface IFlipCounterProps {
  startDate?: Date;
}

export const FlipCounter: React.FC<IFlipCounterProps> = (props) => {
  const { startDate } = props;

  const [daysPassed, setDaysPassed] = useState(0);
  const [previousDaysPassed, setPreviousDaysPassed] = useState(0);
  const [digits, setDigits] = useState<string[]>([]);
  const [previousDigits, setPreviousDigits] = useState<string[]>([]);
  const [shuffles, setShuffles] = useState<boolean[]>([]);
  const [animationDuration, setAnimationDuration] = useState(100);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialDaysPassed = calculateDaysPassed(props.startDate || new Date());
    const initialDigits = getDigits(initialDaysPassed);
    setDaysPassed(initialDaysPassed);
    setPreviousDaysPassed(initialDaysPassed);
    setDigits(initialDigits);
    setPreviousDigits(initialDigits);
    setShuffles(initialDigits.map(() => false));
    setAnimationDuration(100);

    startCounting();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [props.startDate]); // Use props.startDate here

  const startCounting = () => {
    const targetDaysPassed = calculateDaysPassed(props.startDate || new Date());
    let currentDaysPassed = 0;
    const incrementStep = 1;

    const baseAnimationDuration = 100; // Starting with 100ms
    const baseUpdateInterval = 100; // Starting with 100ms

    const updateCounter = () => {
      const numbersRemaining = targetDaysPassed - currentDaysPassed;

      let updateInterval = baseUpdateInterval;
      let newAnimationDuration = baseAnimationDuration;

      // Create a map with the number of days remaining as the key and the animation duration as the value
      const animationDurations: { [key: number]: number } = {
        4: 200,
        3: 400,
        2: 600,
        1: 600,
      };

      // Set specific animation durations for the last 4 numbers
      if (numbersRemaining <= 4 && numbersRemaining >= 1) {
        // Get the corresponding animation duration
        newAnimationDuration = animationDurations[numbersRemaining];
        // Set the update interval to the same as the animation duration
        updateInterval = newAnimationDuration;
      }

      if (currentDaysPassed <= targetDaysPassed) {
        currentDaysPassed = Math.min(currentDaysPassed + incrementStep, targetDaysPassed);
        updateDaysPassed(currentDaysPassed, newAnimationDuration);

        intervalRef.current = setTimeout(updateCounter, updateInterval);
      } else {
        // Counting complete, set interval to update every day
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
          intervalRef.current = null;
        }
        intervalRef.current = setInterval(() => {
          updateDaysPassed();
        }, 1000 * 60 * 60 * 24); // Every day
      }
    };

    updateCounter();
  };

  const updateDaysPassed = (overrideDaysPassed?: number, newAnimationDuration?: number) => {
    const days =
      overrideDaysPassed !== undefined
        ? overrideDaysPassed
        : calculateDaysPassed(props.startDate || new Date());

    const newDigits = getDigits(days);
    const paddedPreviousDigits = [...digits]; // Make a copy of the current digits
    const maxLength = Math.max(paddedPreviousDigits.length, newDigits.length, 2);

    const paddedDigits = padDigitsArray(newDigits, maxLength);
    const newShuffles = paddedDigits.map(
      (digit, index) => digit !== paddedPreviousDigits[index]
    );

    setPreviousDigits(paddedPreviousDigits); // Maintain previous digits
    setDigits(paddedDigits); // Set the new digits
    setShuffles(newShuffles); // Set which digits need to be shuffled
    setDaysPassed(days); // Update days passed
    setPreviousDaysPassed(daysPassed); // Update previous days passed
    setAnimationDuration(newAnimationDuration ?? animationDuration); // Set animation duration
  };

  const getDigits = (num: number): string[] => {
    const strNum = num.toString().padStart(2, '0');
    return strNum.split('');
  };

  const padDigitsArray = (arr: string[], length: number): string[] => {
    const padded = arr.slice();
    while (padded.length < length) {
      padded.unshift('0');
    }
    return padded;
  };

  const calculateDaysPassed = (startDate: Date): number => {
    const today = new Date();
    const timeDiff = today.getTime() - startDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  // Return the JSX directly without a render method
  return (
    <div className="flip-counter">
      <div className="flipClock">
        {digits.map((digit, index) => (
          <FlipUnitContainer
            key={index}
            digit={digit}
            previousDigit={previousDigits[index]}
            shuffle={shuffles[index]}
            animationDuration={animationDuration}
          />
        ))}
      </div>
      <Label>Days Since Start</Label>
    </div>
  );
};
