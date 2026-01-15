import styled from 'styled-components';
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

const CardWrapper = styled.div<{ $rotation: number }>`
  position: absolute;
  bottom: 0;
  transform-origin: 50% ${DECK_CONFIG.RADIUS_PERCENT};
  transform: rotate(${props => props.$rotation}deg) translateY(${DECK_CONFIG.ARC_OFFSET_Y});
  /* Ensure click events work on the visible part */
  pointer-events: auto; 
  
  &:hover {
    /* Maintain original z-index to keep overlap order */
    transform: rotate(${props => props.$rotation}deg) translateY(calc(${DECK_CONFIG.ARC_OFFSET_Y} - 2em));
    transition: transform 0.2s ease-out;
  }
  transition: transform 0.3s ease-out;
`;

export function CardDeck() {
    const TOTAL_CARDS = 22;
    const { ARC_ANGLE } = DECK_CONFIG;
    const START_ANGLE = -ARC_ANGLE / 2;
    const ANGLE_STEP = ARC_ANGLE / (TOTAL_CARDS - 1);

    return (
        <DeckContainer>
            {Array.from({ length: TOTAL_CARDS }).map((_, index) => {
                const rotation = START_ANGLE + (index * ANGLE_STEP);
                return (
                    <CardWrapper
                        key={index}
                        $rotation={rotation}
                        style={{ zIndex: index }}
                    >
                        <TarotCard />
                    </CardWrapper>
                );
            })}
        </DeckContainer>
    );
}
