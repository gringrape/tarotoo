import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnalysisResponse } from '../api/tarotApi';
import { theme } from '../styles/designSystem';
import { SingleCardView } from './InfoBoard/SingleCardView';
import { GridSummaryView } from './InfoBoard/GridSummaryView';
import { StrategyView } from './InfoBoard/StrategyView';
import { TypeText } from './InfoBoard/styles';

const TextContainer = styled(motion.div)`
  width: 40%;
  max-width: 900px;
  max-height: 85vh; /* Limit height to allow inner scroll */
  font-size: 0.85rem; /* Control overall size here */
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: -10vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* overflow is managed by ScrollContent for inner scrolling */

  ${theme.media.mobile} {
    width: 80vw;
    padding: 1.5rem;
    max-height: calc(100vh - 200px); /* Leave ample room for bottom button */
    overflow-y: auto; /* Allow entire container to scroll */
    
    /* Custom Scrollbar for Mobile */
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.primary};
      border-radius: 3px;
    }
  }
`;

interface InfoBoardProps {
  isVisible: boolean;
  isFinal: boolean;
  isFlipStep: boolean;
  textInfo: {
    section: string;
    name: string;
    desc: string;
    cardId: number | null;
  };
  analysisData: AnalysisResponse | null;
  error: string | null;
  theirCards?: number[];
  myCards?: number[];
  step?: number;
}

export function InfoBoard({ isVisible, isFinal, isFlipStep, textInfo, analysisData, error, theirCards = [], myCards = [], step = 0 }: InfoBoardProps) {
  if (error) {
    return (
      <TextContainer>
        <TypeText>{error}</TypeText>
      </TextContainer>
    );
  }

  return (
    <TextContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <AnimatePresence mode="wait">
        {!isFinal && isVisible && textInfo.cardId !== null && (
          <SingleCardView
            key={textInfo.cardId || 'unknown-card'} // Use cardId to persist state across flip/text steps
            cardId={textInfo.cardId}
            section={textInfo.section}
            name={textInfo.name}
            desc={textInfo.desc}
            isFlipStep={isFlipStep}
          />
        )}

        {/* Step 13: Card Grid Summary (Cards + Summaries) */}
        {isFinal && analysisData && step === 13 && (
          <GridSummaryView
            key="step-13-grid"
            theirCards={theirCards}
            myCards={myCards}
            theirFeelings={analysisData.theirFeelings}
            myFeelings={analysisData.myFeelings}
          />
        )}

        {/* Step 14+: Strategy View (Overall Strategy Only) */}
        {isFinal && analysisData && step >= 14 && (
          <StrategyView
            key="step-14-strategy"
            overallStrategy={analysisData.overallStrategy}
          />
        )}
      </AnimatePresence>
    </TextContainer>
  );
}
