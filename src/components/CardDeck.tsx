import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from './TarotCard';

// === Deck Configuration ===
const DECK_CONFIG = {
  BOTTOM_OFFSET: '0',
  SCALE: {
    MOBILE: '0.35rem',
    TABLET: '0.5rem',
    DESKTOP: '0.5rem',
  },
  ARC_ANGLE: 100,
  RADIUS_PERCENT: '250%',
  ARC_OFFSET_Y: '-8em',
};

// === Selection Configuration ===
const SELECTION_CONFIG = {
  SCALE: 0.7,
  GAP_PERCENT: 100, // 100 = adjacent
  Y_OFFSET: '-50vh', // From bottom
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
  pointer-events: none; /* Let clicks pass through container */
  
  font-size: ${DECK_CONFIG.SCALE.MOBILE}; 
  @media (min-width: 768px) { font-size: ${DECK_CONFIG.SCALE.TABLET}; }
  @media (min-width: 1024px) { font-size: ${DECK_CONFIG.SCALE.DESKTOP}; }
`;

const CardWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  transform-origin: 50% ${DECK_CONFIG.RADIUS_PERCENT};
  pointer-events: auto; 
  cursor: pointer;
  z-index: 0;
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
        const isSelected = selectedCards.includes(index);
        const selectionIndex = selectedCards.indexOf(index);

        // --- 1. Fan Position Calculation ---
        const rotation = START_ANGLE + (index * ANGLE_STEP);
        const fanX = '0%';
        const fanY = DECK_CONFIG.ARC_OFFSET_Y;
        const fanRotate = `${rotation}deg`;
        const fanScale = 1;
        const fanOrigin = `50% ${DECK_CONFIG.RADIUS_PERCENT}`;
        const fanZIndex = index;

        // --- 2. Selection Position Calculation ---
        let selectX = '0%';
        if (selectionIndex === 0) selectX = `-${SELECTION_CONFIG.GAP_PERCENT}%`;
        else if (selectionIndex === 1) selectX = '0%';
        else if (selectionIndex === 2) selectX = `${SELECTION_CONFIG.GAP_PERCENT}%`;

        // We use -50vh to move up from bottom
        const selectY = SELECTION_CONFIG.Y_OFFSET;
        const selectRotate = '0deg';
        const selectScale = SELECTION_CONFIG.SCALE;
        // When selected, we want center origin for scaling/rotation
        const selectOrigin = '50% 50%';
        const selectZIndex = 1000 + index; // High z-index

        return (
          <CardWrapper
            key={index}
            initial={false}
            animate={{
              x: isSelected ? selectX : fanX,
              y: isSelected ? selectY : fanY,
              rotate: isSelected ? selectRotate : fanRotate,
              scale: isSelected ? selectScale : fanScale,
              transformOrigin: isSelected ? selectOrigin : fanOrigin,
              zIndex: isSelected ? selectZIndex : fanZIndex,
            }}
            whileHover={!isSelected ? {
              y: `calc(${DECK_CONFIG.ARC_OFFSET_Y} - 2em)`,
              transition: { duration: 0.2 }
            } : {}}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
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
