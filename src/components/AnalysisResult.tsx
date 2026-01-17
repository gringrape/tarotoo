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
  font-family: 'KerisKeduLine', sans-serif;
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

export function AnalysisResult({ theirCards, myCards }: AnalysisResultProps) {
    const {
        step,
        loading,
        error,
        analysisData,
        typedText,
        textInfo,
        isFinal,
        getIsFlipped
    } = useAnalysisFlow({ theirCards, myCards });

    if (loading) {
        return (
            <Container>
                <LoadingText>운명을 분석하고 있습니다...</LoadingText>
            </Container>
        );
    }

    return (
        <Container>
            <CardSection
                title="나를 향한 상대방의 마음"
                cards={theirCards}
                isFlippedFn={(i) => getIsFlipped('THEIR', i)}
            />

            <CardSection
                title="상대방을 향한 나의 마음"
                cards={myCards}
                isFlippedFn={(i) => getIsFlipped('MY', i)}
                delayStart={0.3}
                extraStyle={{ marginBottom: '20vh' }}
            />

            <InfoBoard
                isVisible={step >= 2 || !!error}
                isFinal={isFinal}
                textInfo={{ ...textInfo, typedText }}
                analysisData={analysisData}
                error={error}
            />
        </Container>
    );
}
