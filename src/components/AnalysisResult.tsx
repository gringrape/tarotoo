import styled from 'styled-components';
import { useAnalysisFlow } from '../hooks/useAnalysisFlow';
import { InfoBoard } from './InfoBoard';
import { LoadingScene } from './Three/LoadingScene';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  color: #fff;
  padding-bottom: 4rem;
  justify-content: flex-start;
  min-height: 80vh; /* Center properly */
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
    textInfo,
    isFinal,
    isFlipStep,
    nextPhase
  } = useAnalysisFlow({ theirCards, myCards });

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <LoadingScene />
        <LoadingText style={{ marginTop: '2rem' }}>운명을 분석하고 있습니다...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <InfoBoard
        isVisible={true}
        isFinal={isFinal}
        isFlipStep={isFlipStep}
        textInfo={textInfo}
        analysisData={analysisData}
        error={error}
        theirCards={theirCards}
        myCards={myCards}
        step={step}
      />

      {((step % 2 === 0 && step > 0 && step <= 12) || step === 13) && (
        <NextButton onClick={nextPhase}>
          다음으로
        </NextButton>
      )}
    </Container>
  );
}
