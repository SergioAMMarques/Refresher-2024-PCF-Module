import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Label } from '@fluentui/react';
import './CSS/flipCounter.css';
import { FlipUnitContainer } from './FlipClockComponents';

export interface IFlipCounterProps {
  daysPassed: number; // Now we receive daysPassed directly
}

// Helper function to convert a number to an array of string digits (e.g., 12 -> ['1', '2'])
const getDigits = (num: number): string[] => {
  const strNum = num.toString().padStart(2, '0'); // Ensure at least two digits
  return strNum.split('');
};

// Helper function to pad an array of digits with leading zeros if needed
const padDigitsArray = (arr: string[], length: number): string[] => {
  const padded = arr.slice();
  while (padded.length < length) {
    padded.unshift('0');
  }
  return padded;
};

export const FlipCounter: React.FC<IFlipCounterProps> = (props) => {
  const { daysPassed } = props; // Destructure daysPassed from props

  const [currentCount, setCurrentCount] = useState(0); // State to track the current displayed count
  const [digits, setDigits] = useState<string[]>(getDigits(0)); // Initialize with '00'
  const [previousDigits, setPreviousDigits] = useState<string[]>(getDigits(0));
  const [shuffles, setShuffles] = useState<boolean[]>([false, false]); // Shuffle state for animation
  const [animationDuration, setAnimationDuration] = useState(100); // Default animation duration

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startCounting(); // Start counting up to the target daysPassed when component mounts

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current); // Cleanup the interval on component unmount
      }
    };
  }, [daysPassed]); // Restart the counting effect if daysPassed changes

  // Function to start the counting logic
  const startCounting = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current); // Clear any existing timeout before starting
    }

    let count = 0; // Start counting from 0
    const incrementStep = 1; // Increment by 1 each time

    const updateCounter = () => {
      if (count <= daysPassed) {
        updateDigits(count); // Update digits with current count
        count += incrementStep; // Increment count

        // Continue counting every 100ms
        intervalRef.current = setTimeout(updateCounter, 100);
      } else {
        // Stop the counter when we reach daysPassed
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
        }
      }
    };

    updateCounter(); // Start the counter
  };

  // Function to update the displayed digits
  const updateDigits = (count: number) => {
    const newDigits = getDigits(count); // Convert count to digits
    const newShuffles = newDigits.map((digit, index) => digit !== digits[index]); // Determine which digits changed

    setPreviousDigits([...digits]); // Set previous digits for animation
    setDigits(newDigits); // Update current digits
    setShuffles(newShuffles); // Set which digits need to shuffle
    setCurrentCount(count); // Update the current count state
  };

  // Render the component
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
