import * as React from 'react';

interface AnimatedCardProps {
    animation: string;
    digit: string;
    style?: React.CSSProperties;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ animation, digit, style }) => {
    return (
        <div className={`flipCard ${animation}`} style={style}>
            <span>{digit}</span>
        </div>
    );
};

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

interface FlipUnitContainerProps {
    digit: string;
    previousDigit: string;
    shuffle: boolean;
    animationDuration: number;
}

export const FlipUnitContainer: React.FC<FlipUnitContainerProps> = ({
    digit,
    previousDigit,
    shuffle,
    animationDuration,
}) => {
    // If the previous digit is not provided, default to '0'
    const currentDigit = digit || '0';
    const previousDigitValue = previousDigit || '0';

    // Show the current digit in the upper part of the card
    const upperCardDigit = currentDigit;

    // In the lower part of the card, show the current digit - 1 during the animation, or 0 otherwise
    const lowerCardDigit = shuffle && parseInt(currentDigit) > 0
        ? (parseInt(currentDigit) - 1).toString()
        : currentDigit;

    return (
        <div className="flipUnitContainer">
            <StaticCard position="upperCard" digit={upperCardDigit} />
            <StaticCard position="lowerCard" digit={lowerCardDigit} />
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
