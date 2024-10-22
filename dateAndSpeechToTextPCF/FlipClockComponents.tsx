import * as React from 'react';

// AnimatedCard Component
interface AnimatedCardProps {
  animation: string;
  digit: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// StaticCard Component
interface StaticCardProps {
  position: string;
  digit: string;
}

export const StaticCard: React.FC<StaticCardProps> = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// FlipUnitContainer Component
interface FlipUnitContainerProps {
  digit: string;
  previousDigit: string;
  shuffle: boolean;
}

export const FlipUnitContainer: React.FC<FlipUnitContainerProps> = ({
  digit,
  previousDigit,
  shuffle,
}) => {
  // Shuffle digits
  const digit1 = shuffle ? previousDigit : digit;
  const digit2 = !shuffle ? previousDigit : digit;

  // Shuffle animations
  const animation1 = shuffle ? 'fold' : 'unfold';
  const animation2 = !shuffle ? 'fold' : 'unfold';

  return (
    <div className="flipUnitContainer">
      <StaticCard position="upperCard" digit={digit} />
      <StaticCard position="lowerCard" digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  );
};
