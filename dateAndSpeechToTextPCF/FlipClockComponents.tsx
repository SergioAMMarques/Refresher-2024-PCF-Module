import * as React from 'react';

// AnimatedCard Component
interface AnimatedCardProps {
    animation: string;
    digit: string;
    style?: React.CSSProperties; // Add optional style prop
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ animation, digit, style }) => {
    return (
        <div className={`flipCard ${animation}`} style={style}>
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
    animationDuration: number; // Control animation speed
}

export const FlipUnitContainer: React.FC<FlipUnitContainerProps> = ({
    digit,
    previousDigit,
    shuffle,
    animationDuration,
}) => {
    // Default digits to "00" when not calculating or no valid digit is available
    const currentDigit = digit || '0'; // Default to '0' if digit is undefined or empty
    const previousDigitValue = previousDigit || '0'; // Default to '0' for previous digit

    // Show the current digit in the upper part of the card
    const upperCardDigit = currentDigit;

    // In the lower part of the card, show the current digit - 1 during the animation, or 0 otherwise
    const lowerCardDigit = shuffle && parseInt(currentDigit) > 0
        ? (parseInt(currentDigit) - 1).toString()
        : currentDigit;

    return (
        <div className="flipUnitContainer">
            {/* Upper card shows the current digit */}
            <StaticCard position="upperCard" digit={upperCardDigit} />

            {/* Lower card shows the current digit - 1 during the animation, or the current digit otherwise */}
            <StaticCard position="lowerCard" digit={lowerCardDigit} />

            {/* Animated cards handle the transition from previous digit to new digit */}
            {shuffle && (
                <>
                    <AnimatedCard key={`fold-${previousDigitValue}`} digit={previousDigitValue} animation="fold" />
                    <AnimatedCard
                        key={`unfold-${currentDigit}`}
                        digit={currentDigit}
                        animation="unfold"
                        style={{ animationDuration: `${animationDuration}ms` }}
                    />
                </>
            )}
        </div>
    );
};
