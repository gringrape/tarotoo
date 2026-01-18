import styled from 'styled-components';
import { useAnalysisFlow } from '../hooks/useAnalysisFlow';
import { CardSection } from './CardSection';
import { InfoBoard } from './InfoBoard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  color: #fff;
  padding-bottom: 4rem;
`;

const LoadingText = styled.div`
  font-family: 'GounBatang', serif;
  font-size: 1.5rem;
  color: #E0D4FC;
  animation: blink 1.5s infinite;
  
  @keyframes blink {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
`;

interface AnalysisResultProps {
    theirCards: number[];
    myCards: number[];
}

const NextButton = styled.button`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  
  background: #6A0dad;
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'GounBatang', serif;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
  animation: fadeIn 0.5s ease-in-out;

  &:hover {
    background: #800080;
    transform: translateX(-50%) scale(1.05);
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;

export function AnalysisResult({ theirCards, myCards }: AnalysisResultProps) {
    const {
        step,
        loading,
        error,
        analysisData,
        typedText,
        textInfo,
        isFinal,
        getIsFlipped,
        nextPhase
    } = useAnalysisFlow({ theirCards, myCards });

    if (loading) {
        return (
            <Container>
                <LoadingText>운명을 분석하고 있습니다...</LoadingText>
            </Container>
        );
    }

    const showTheirCards = step <= 6;
    const showMyCards = step > 6 && step <= 12;
    const canProceed = (step === 6 || step === 12);

    return (
        <Container>
            {showTheirCards && (
                <CardSection
                    title="나를 향한 상대방의 마음"
                    cards={theirCards}
                    isFlippedFn={(i) => getIsFlipped('THEIR', i)}
                />
            )}

            {showMyCards && (
                <CardSection
                    title="상대방을 향한 나의 마음"
                    cards={myCards}
                    isFlippedFn={(i) => getIsFlipped('MY', i)}
                    delayStart={0}
                />
            )}

            <InfoBoard
                isVisible={true}
                isFinal={isFinal}
                textInfo={{ ...textInfo, typedText }}
                analysisData={analysisData}
                error={error}
            />

            {canProceed && (
                <NextButton onClick={nextPhase}>
                    다음으로
                </NextButton>
            )}
        </Container>
    );
}
