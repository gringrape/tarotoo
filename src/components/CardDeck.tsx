import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from './TarotCard';

// === Deck Configuration ===
const DECK_CONFIG = {
  // Distance from bottom of the screen
  BOTTOM_OFFSET: '0',

  // Base font-size for scaling card (1em = font-size)
  // Original Card Size: 20em x 35em
  SCALE: {
    MOBILE: '0.35rem',
    TABLET: '0.5rem',
    DESKTOP: '0.5rem',
  },

  // Fan Geometry
  ARC_ANGLE: 100, // Degrees
  RADIUS_PERCENT: '250%', // Distance to rotation point (Larger = flatter arc)
  ARC_OFFSET_Y: '-8em', // Fine-tune vertical position on the arc
};

const DeckContainer = styled.div`
  position: absolute;
  bottom: ${DECK_CONFIG.BOTTOM_OFFSET};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  
  /* Scale controls */
  font-size: ${DECK_CONFIG.SCALE.MOBILE}; 

  @media (min-width: 768px) {
    font-size: ${DECK_CONFIG.SCALE.TABLET};
  }

  @media (min-width: 1024px) {
    font-size: ${DECK_CONFIG.SCALE.DESKTOP};
  }
`;

// Removed SELECTION_CONFIG as it's now handled by SelectedCards component

const CardWrapper = styled(motion.div) <{ $rotation: number }>`
  position: absolute;
  bottom: 0;
  transform-origin: 50% ${DECK_CONFIG.RADIUS_PERCENT};
  
  /* Ensure click events work on the visible part */
  pointer-events: auto; 
  cursor: pointer;
  
  &:hover {
    /* Maintain original z-index to keep overlap order */
    transform: rotate(${props => props.$rotation}deg) translateY(calc(${DECK_CONFIG.ARC_OFFSET_Y} - 2em));
    transition: transform 0.2s ease-out;
  }
  /* Base transition for hover */
  transition: transform 0.3s ease-out;
`;

interface CardDeckProps {
  selectedCards?: number[];
  onCardClick?: (index: number) => void;
}

export function CardDeck({ selectedCards = [], onCardClick }: CardDeckProps) {
  const TOTAL_CARDS = 22;
  const { ARC_ANGLE } = DECK_CONFIG;
  const START_ANGLE = -ARC_ANGLE / 2;
  const ANGLE_STEP = ARC_ANGLE / (TOTAL_CARDS - 1);

  return (
    <DeckContainer>
      {Array.from({ length: TOTAL_CARDS }).map((_, index) => {
        // If card is selected, don't render it here (it will be in SelectedCards)
        if (selectedCards.includes(index)) return null;

        const rotation = START_ANGLE + (index * ANGLE_STEP);

        return (
          <CardWrapper
            key={index}
            layoutId={`card-${index}`}
            $rotation={rotation}
            style={{
              zIndex: index,
              // Apply rotation via style for initial position
              transform: `rotate(${rotation}deg) translateY(${DECK_CONFIG.ARC_OFFSET_Y})`
            }}
            onClick={() => onCardClick && onCardClick(index)}
          >
            <TarotCard />
          </CardWrapper>
        );
      })}
    </DeckContainer>
  );
}
