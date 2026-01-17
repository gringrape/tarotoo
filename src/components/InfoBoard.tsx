import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { AnalysisResponse } from '../api/tarotApi';

const TextContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  min-height: 200px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 2rem;
  z-index: 10;
`;

const TypeLabel = styled.h3`
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 1.5rem;
  color: #E0D4FC;
  margin-bottom: 0.5rem;
`;

const CardName = styled.h4`
  font-size: 1.2rem;
  color: #FFD700;
  margin-bottom: 1rem;
`;

const TypeText = styled.p`
  font-family: 'Suit', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ResultTitle = styled.h2`
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #FFD700;
`;

const ResultDesc = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #ddd;
`;

interface InfoBoardProps {
    isVisible: boolean;
    isFinal: boolean;
    textInfo: {
        section: string;
        name: string;
        typedText: string; // The currently typed text passed from parent/hook
    };
    analysisData: AnalysisResponse | null;
    error: string | null;
}

export function InfoBoard({ isVisible, isFinal, textInfo, analysisData, error }: InfoBoardProps) {
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
            {!isFinal && isVisible && (
                <motion.div
                    key={textInfo.section + textInfo.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ width: '100%' }}
                >
                    <TypeLabel>{textInfo.section}</TypeLabel>
                    <CardName>{textInfo.name}</CardName>
                    <TypeText>{textInfo.typedText}</TypeText>
                </motion.div>
            )}

            {isFinal && analysisData && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
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
        </TextContainer>
    );
}
