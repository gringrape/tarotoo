import { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from './TarotCard';
import { TAROT_DATA } from '../data/tarotData';
import { theme } from '../styles/designSystem';
import { useMediaQuery } from '../hooks/useMediaQuery';

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
  DESKTOP: {
    SCALE: 0.9,
    GAP_PERCENT: 100,
    // Position relative to the deck arc (deck-y-offset is -8em)
    // Moving up by 30em (card height approx 35em) places it nicely above
    Y_OFFSET: 'calc(var(--deck-y-offset) - 40em)',
  },
  MOBILE: {
    SCALE: 0.95,
    GAP_PERCENT: 100,
    // Mobile deck is already very high (-40em).
    // Note: Mobile viewport height interactions are tricky.
    // Let's try relative first, but maybe sticking to a safe top offset is better?
    // Actually, user asked for relative. 
    // If deck is at -40em, and we subtract 20em -> -60em.
    Y_OFFSET: 'calc(var(--deck-y-offset) - 70em)',
  }
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
  pointer-events: none;
  z-index: 10;
  
  /* CSS Variables for responsive config */
  --deck-radius: ${DECK_CONFIG.RADIUS_PERCENT};
  --deck-y-offset: ${DECK_CONFIG.ARC_OFFSET_Y};
  
  font-size: ${DECK_CONFIG.SCALE.MOBILE}; 
  
  ${theme.media.mobile} { 
    font-size: 0.22rem; 
    bottom: 0; /* Align to bottom (was -2em) */
    
    /* Steeper curvature and position adjustment for mobile */
    --deck-radius: 200%; /* Steeper than 250% */
    --deck-y-offset: -40em; /* Adjusted vertical offset */
    padding-bottom: 5vh; /* Move up slightly */
  }

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
  const isMobile = useMediaQuery('(max-width: 768px)');
  const TOTAL_CARDS = 22;
  const { ARC_ANGLE } = DECK_CONFIG;
  const START_ANGLE = -ARC_ANGLE / 2;
  const ANGLE_STEP = ARC_ANGLE / (TOTAL_CARDS - 1);

  // Randomize card order on mount
  const shuffledIndices = useMemo(() => {
    const indices = Array.from({ length: TOTAL_CARDS }, (_, i) => i);

    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return indices;
  }, []);

  return (
    <DeckContainer>
      {shuffledIndices.map((cardId, index) => {
        const isSelected = selectedCards.includes(cardId);
        const selectionIndex = selectedCards.indexOf(cardId);

        // --- 1. Fan Position Calculation ---
        let rotation, fanY, fanZIndex;
        const fanX = '0%';
        const fanScale = 1;
        const fanOrigin = `50% var(--deck-radius)`;

        if (isMobile) {
          // Mobile: 2 Rows (0-10 Back, 11-21 Front)
          const ROW_SIZE = 11;
          const isBackRow = index < ROW_SIZE;
          const indexInRow = index % ROW_SIZE;

          // Re-calculate rotation for the smaller row
          const rowAngleStep = ARC_ANGLE / (ROW_SIZE - 1);
          const rowStartAngle = -ARC_ANGLE / 2;
          rotation = rowStartAngle + (indexInRow * rowAngleStep);

          // Position
          // Front row uses base offset, Back row is higher up (more negative)
          fanY = isBackRow ? 'calc(var(--deck-y-offset) - 6rem)' : 'var(--deck-y-offset)';

          // Z-Index: Front row must be on top of Back row
          fanZIndex = isBackRow ? index : (index + 100);

        } else {
          // Desktop: Single Arc
          rotation = START_ANGLE + (index * ANGLE_STEP);
          fanY = 'var(--deck-y-offset)';
          fanZIndex = index;
        }

        const fanRotate = `${rotation}deg`;

        // --- 2. Selection Position Calculation ---
        const config = isMobile ? SELECTION_CONFIG.MOBILE : SELECTION_CONFIG.DESKTOP;

        let selectX = '0%';
        if (selectionIndex === 0) selectX = `-${config.GAP_PERCENT}%`;
        else if (selectionIndex === 1) selectX = '0%';
        else if (selectionIndex === 2) selectX = `${config.GAP_PERCENT}%`;

        const selectY = config.Y_OFFSET;
        const selectRotate = '0deg';
        const selectScale = config.SCALE;
        const selectOrigin = '50% 50%';
        const selectZIndex = 1000 + index;

        return (
          <CardWrapper
            key={cardId}
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
            onClick={() => onCardClick && onCardClick(cardId)}
            data-testid={`card-wrapper-${cardId}`}
          >
            <TarotCard image={TAROT_DATA[cardId]?.image} />
          </CardWrapper>
        );
      })}
    </DeckContainer>
  );
}
