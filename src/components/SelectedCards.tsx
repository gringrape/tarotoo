import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from './TarotCard';

const SELECTION_CONFIG = {
    SCALE: 0.4,
    GAP_PERCENT: 120, // 100 = adjacent, >100 = spaced out
    Y_OFFSET: '-45%', // Vertical offset from center
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120%; /* Gap controlled by container logic or individual positioning */
  width: 100%;
  height: 100%;
  pointer-events: none; /* Allow clicks to pass through to deck if needed, but cards will capture clicks */
`;

const SelectedSlot = styled(motion.div) <{ $offset: string }>`
  position: absolute;
  /* Use translate for positioning to match the deck's transform-based movement */
  /* Combine horizontal offset with vertical offset config */
  transform: translate(${props => props.$offset}, ${SELECTION_CONFIG.Y_OFFSET}) !important; 
  /* Scale is handled by layoutId shared element transition or explicit style */
  z-index: 1000;
  pointer-events: auto;
  cursor: pointer;
  
  /* We can apply scale here directly */
  scale: ${SELECTION_CONFIG.SCALE};
`;

interface SelectedCardsProps {
    selectedCards: number[];
    onCardClick: (index: number) => void;
}

export function SelectedCards({ selectedCards, onCardClick }: SelectedCardsProps) {
    return (
        <Container>
            {selectedCards.map((cardIndex, i) => {
                let offset = '0%';
                if (i === 0) offset = `-${SELECTION_CONFIG.GAP_PERCENT}%`;
                else if (i === 1) offset = '0%';
                else if (i === 2) offset = `${SELECTION_CONFIG.GAP_PERCENT}%`;

                return (
                    <SelectedSlot
                        key={cardIndex}
                        layoutId={`card-${cardIndex}`}
                        $offset={offset}
                        onClick={() => onCardClick(cardIndex)}
                        initial={false} // Let framer handle the entry from the deck
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <TarotCard />
                    </SelectedSlot>
                );
            })}
        </Container>
    );
}
