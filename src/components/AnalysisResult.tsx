import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAnalysisFlow } from '../hooks/useAnalysisFlow';
import { InfoBoard } from './InfoBoard';
import { LoadingScene } from './Three/LoadingScene';
import { theme } from '../styles/designSystem';

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

const LOADING_MESSAGES = [
  "운명을 분석하고 있습니다...",
  "별들의 속삭임을 듣고 있어요...",
  "카드의 신호를 해석하는 중입니다...",
  "당신의 이야기를 읽고 있습니다...",
  "잠시만 기다려주세요..."
];

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
  
  background: ${theme.colors.primary};
  color: ${theme.colors.text.dark};
  border: none;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: ${theme.fonts.main};
  font-weight: bold;
  box-shadow: 0 4px 15px ${theme.colors.primaryShadow};
  transition: all 0.2s ease;
  animation: fadeIn 0.5s ease-in-out;

  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 0 25px ${theme.colors.primaryShadow};
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;

const GuidanceOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 500;
  opacity: ${props => props.$isVisible ? 1 : 0};
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
  transition: opacity 0.5s ease-in-out;
`;

const GuidanceText = styled.div`
  font-family: 'GounBatang', serif;
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  text-align: center;
`;

export function AnalysisResult({ theirCards, myCards }: AnalysisResultProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dismissedSteps, setDismissedSteps] = useState<number[]>([]);
  const [isFlowPaused, setIsFlowPaused] = useState(false); // State to control flow pausing

  const {
    step,
    loading,
    error,
    analysisData,
    textInfo,
    isFinal,
    isFlipStep,
    nextPhase
  } = useAnalysisFlow({
    theirCards,
    myCards,
    isPaused: isFlowPaused // Pass the new state here
  });

  // Helper to get guidance text based on step
  const getGuidanceText = (currentStep: number) => {
    if (currentStep === 1) return "먼저 상대방의 마음을 알아볼까요?";
    if (currentStep === 7) return "이제 당신의 마음을 읽어볼게요";
    if (currentStep === 13) return "결과를 종합해드릴게요";
    return null;
  };

  const currentGuidanceText = getGuidanceText(step);
  const showGuidance = !!currentGuidanceText && !dismissedSteps.includes(step);

  // Update isFlowPaused based on showGuidance
  useEffect(() => {
    setIsFlowPaused(showGuidance);
  }, [showGuidance]);

  // Rotating Loading Messages
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [loading]);

  const handleDismissGuidance = () => {
    if (currentGuidanceText) {
      setDismissedSteps((prev) => [...prev, step]);
    }
  };

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <LoadingScene />
        <LoadingText style={{ marginTop: '2rem' }}>
          {LOADING_MESSAGES[messageIndex]}
        </LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <GuidanceOverlay
        $isVisible={showGuidance}
        onClick={handleDismissGuidance}
      >
        <GuidanceText>{currentGuidanceText}</GuidanceText>
      </GuidanceOverlay>

      {!showGuidance && step > 0 && (
        <>
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
        </>
      )}
    </Container>
  );
}
