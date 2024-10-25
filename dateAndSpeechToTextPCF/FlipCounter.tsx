import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Label } from '@fluentui/react';
import './CSS/flipCounter.css';
import { FlipUnitContainer } from './FlipClockComponents';

export interface IFlipCounterProps {
  daysPassed: number;
}

// Helper function to get an array of digits from a number (e.g. 12 -> ['1', '2'])
const getDigits = (num: number): string[] => {

  // Convert the number to a string and pad with leading zeros if the number is less than 10
  return num.toString().padStart(2, '0').split('');
};

export const FlipCounter: React.FC<IFlipCounterProps> = ({ daysPassed }) => {

  // State to track the current displayed count (days passed)
  const [currentCount, setCurrentCount] = useState(0);

  // State to track the current displayed digits (initialized with '00') for animation purposes
  const [digits, setDigits] = useState<string[]>(getDigits(0));

  // State to track the previous displayed digits (initialized with '00') for animation purposes
  const [previousDigits, setPreviousDigits] = useState<string[]>(getDigits(0));

   // State to track the animation duration for each digit
   const [animationDuration, setAnimationDuration] = useState(100);

  // State to track which digits need to shuffle for animation purposes
  const [shuffles, setShuffles] = useState<boolean[]>([false, false]);

  // Ref to store the interval ID for the counting logic (to be able to clear it on unmount) 
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to start counting up to the target daysPassed
  useEffect(() => {
    startCounting();
    return () => {
      stopCounting();
    };
  }, [daysPassed]);

  // Function to clear any existing interval
  const stopCounting = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  }, []);

  // Function to start counting up to the target daysPassed
  const startCounting = () => {

    stopCounting();

    // start counting from 0
    let count = 0; // Start counting from 0

    // Increment by 1 each time
    const incrementStep = 1;

    // Function to update the counter
    const updateCounter = () => {

      // If we haven't reached daysPassed yet, update the digits and continue counting every 100ms
      if (count <= daysPassed) {
        updateDigits(count);
        count += incrementStep;
        intervalRef.current = setTimeout(updateCounter, 100);

      } else {
        stopCounting();
      }
    };

    // Start the counter
    updateCounter();
  };

  // Function to update the digits displayed in the flip counter
  const updateDigits = (count: number) => {

    // Get the new digits from the count value
    const newDigits = getDigits(count);

    // Determine which digits changed from the previous count to the new count to trigger the shuffle animation for those digits only
    const newShuffles = newDigits.map((digit, index) => digit !== digits[index]);

    // Set the previous digits for animation purposes
    setPreviousDigits([...digits]);

    // Update the current digits
    setDigits(newDigits);

    // Update which digits need to shuffle
    setShuffles(newShuffles);

    // Update the current count state
    setCurrentCount(count);
  };

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
