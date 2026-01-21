import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from '../TarotCard';
import { TAROT_DATA } from '../../data/tarotData';
import type { AnalysisSection } from '../../api/tarotApi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ScrollContent, ResultTitle, CardName, ResultDesc, RowWrapper, LeftCol, RightCol } from './styles';

const LAYOUT_CONFIG = {
    // Adjust these to control card size
    CARD_SCALE_DESKTOP: '0.15rem',
    CARD_SCALE_MOBILE: '0.15rem',

    // Container dimensions (relative to scale)
    FAN_WIDTH: '32em',
    FAN_HEIGHT: '28em',
} as const;

// Container for the Fan Layout
const FanContainer = styled.div`
  position: relative;
  width: ${LAYOUT_CONFIG.FAN_WIDTH};
  height: ${LAYOUT_CONFIG.FAN_HEIGHT};
  margin-top: 2rem;
  z-index: 100;
  
  /* Allow cards to extend outside */
  overflow: visible;

  /* Reserving visual space for the spread so it doesn't hit ScrollContent edge */
  margin: 0 2em; 

  /* Scale down the whole fan assembly */
  font-size: ${LAYOUT_CONFIG.CARD_SCALE_DESKTOP}; 

  @media (max-width: 768px) {
    width: 20em;
    height: 18em;
    font-size: ${LAYOUT_CONFIG.CARD_SCALE_MOBILE};
    margin: 0 2em; /* Smaller margin on mobile */
  }
`;

// Individual Card in the Fan
const FannedCard = styled.div<{ index: number; $isMobile: boolean }>`
  position: absolute;
  width: 14em; /* Intrinsic card size */
  aspect-ratio: 20/35;
  top: 0;
  left: 50%;
  transform-origin: bottom center;
  transition: transform 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);

  /* Fan Logic based on index (0, 1, 2) */
  ${({ index, $isMobile }) => {
        // Determine offset based on device
        const outerY = $isMobile ? '-8em' : '2em';
        const centerY = $isMobile ? '-10em' : '0em';

        if (index === 0) return `
      z-index: 1;
      transform: translateX(-110%) rotate(-15deg) translateY(${outerY});
    `;
        if (index === 1) return `
      z-index: 10; /* Center card on top */
      transform: translateX(-50%) translateY(${centerY});
      
    `;
        if (index === 2) return `
      z-index: 1;
      transform: translateX(10%) rotate(15deg) translateY(${outerY});
    `;
    }}

  /* Ensure card inside is visible */
  & > div {
    width: 100%;
    height: 100%;
    transform: rotateY(180deg); /* Show front */
    transform-style: preserve-3d;
  }
`;

interface GridSummaryViewProps {
    theirCards: number[];
    myCards: number[];
    theirFeelings: AnalysisSection;
    myFeelings: AnalysisSection;
}

export function GridSummaryView({ theirCards, myCards, theirFeelings, myFeelings }: GridSummaryViewProps) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <ScrollContent key="step-13-grid">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '1000px' }}
            >
                <ResultTitle>종합 분석 결과</ResultTitle>

                {/* Section 1: Their Feelings */}
                <RowWrapper style={{ alignItems: 'center', marginBottom: '4rem' }}>
                    {/* Left: Fan Cards */}
                    <LeftCol>
                        <FanContainer>
                            {theirCards.map((cardId, i) => (
                                <FannedCard key={`their-${i}`} index={i} $isMobile={isMobile}>
                                    <div>
                                        <TarotCard image={TAROT_DATA[cardId].image} />
                                    </div>
                                </FannedCard>
                            ))}
                        </FanContainer>
                    </LeftCol>

                    {/* Right: Text */}
                    <RightCol>
                        <CardName>나를 향한 상대방의 마음</CardName>
                        <ResultDesc>{theirFeelings.summary}</ResultDesc>
                    </RightCol>
                </RowWrapper>

                {/* Section 2: My Feelings */}
                <RowWrapper style={{ alignItems: 'center' }}>
                    {/* Left: Fan Cards */}
                    <LeftCol>
                        <FanContainer>
                            {myCards.map((cardId, i) => (
                                <FannedCard key={`my-${i}`} index={i} $isMobile={isMobile}>
                                    <div>
                                        <TarotCard image={TAROT_DATA[cardId].image} />
                                    </div>
                                </FannedCard>
                            ))}
                        </FanContainer>
                    </LeftCol>

                    {/* Right: Text */}
                    <RightCol>
                        <CardName>상대방을 향한 나의 마음</CardName>
                        <ResultDesc>{myFeelings.summary}</ResultDesc>
                    </RightCol>
                </RowWrapper>

            </motion.div>
        </ScrollContent>
    );
}
