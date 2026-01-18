import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnalysisResponse } from '../api/tarotApi';
import { TarotCard } from './TarotCard';
import { TAROT_DATA } from '../data/tarotData';

const TextContainer = styled(motion.div)`
  width: 40%;
  max-width: 900px;
  font-size: 0.85rem; /* Control overall size here */
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(106, 13, 173, 0.5);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(106, 13, 173, 0.8);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 4rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  text-align: left;
`;

const CardDisplay = styled(motion.div)`
  font-size: 0.6em; /* Scale relative to container */
  width: 20em; /* Matches TarotCard width in ems */
  height: 35em; /* Matches TarotCard aspect ratio */
  perspective: 1000px;
  position: relative;
  flex-shrink: 0;
`;

const TypeLabel = styled.h3`
  font-family: 'GounBatang', serif;
  font-size: 1.5em;
  color: #E0D4FC;
  opacity: 0.9;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const CardName = styled.h4`
  font-size: 1.8em;
  color: #FFD700;
  margin: 0 0 1.5rem 0;
  font-weight: bold;
`;

const TypeText = styled(motion.p)`
  font-family: 'GounBatang', serif;
  font-size: 1.3em;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: keep-all;
  color: #fff;
  text-align: left;
`;

const ResultTitle = styled.h2`
  font-family: 'GounBatang', serif;
  font-size: 2em;
  margin-bottom: 1rem;
  color: #FFD700;
  flex-shrink: 0;
`;

const ResultDesc = styled.p`
  font-size: 1em;
  line-height: 1.8;
  color: #ddd;
  word-break: keep-all;
  word-wrap: break-word; /* Fallback */
  white-space: pre-wrap;
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
}

export function InfoBoard({ isVisible, isFinal, isFlipStep, textInfo, analysisData, error }: InfoBoardProps) {
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
          <ContentWrapper key="analysis-step">
            {/* Header: Section Title */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              <TypeLabel>{textInfo.section}</TypeLabel>
            </motion.div>

            <CardName>{textInfo.name}</CardName>
            <RowWrapper>
              {/* Left Column: Name + Card */}
              <LeftCol>
                <CardDisplay
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <TarotCard image={TAROT_DATA[textInfo.cardId].image} />
                </CardDisplay>
              </LeftCol>

              {/* Right Column: Description */}
              <RightCol>
                <TypeText
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFlipStep ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {textInfo.desc}
                </TypeText>
              </RightCol>
            </RowWrapper>
          </ContentWrapper>
        )}

        {isFinal && analysisData && (
          <motion.div
            key="final-summary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring' }}
            style={{ width: '100%' }}
          >
            <ResultTitle>종합 분석 결과</ResultTitle>

            <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <CardName>나를 향한 상대방의 마음 (총평)</CardName>
              <ResultDesc>{analysisData.theirFeelings.summary}</ResultDesc>
            </div>

            <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
              <CardName>상대방을 향한 나의 마음 (총평)</CardName>
              <ResultDesc>{analysisData.myFeelings.summary}</ResultDesc>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
              <CardName>종합 전략</CardName>
              <ResultDesc>{analysisData.overallStrategy}</ResultDesc>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TextContainer>
  );
}
