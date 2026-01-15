import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TarotCard } from './TarotCard';

// === Dummy Data ===
const ANALYSIS_DATA = {
    cards: [
        { type: '과거', desc: '당신의 과거는 혼란스러웠습니다. 하지만 그 속에서도 희망을 잃지 않았군요. 이 카드는 당신이 겪어온 시련이 헛되지 않았음을 의미합니다.' },
        { type: '현재', desc: '현재 상황은 정체되어 보일 수 있습니다. 하지만 물밑에서는 새로운 변화가 태동하고 있습니다. 인내심을 갖고 지켜볼 시기입니다.' },
        { type: '미래', desc: '미래에는 기대 이상의 성과가 기다리고 있습니다. 당신의 노력이 결실을 맺고, 원하던 관계의 회복이 이루어질 가능성이 높습니다.' }
    ],
    result: {
        probability: '85%',
        strategy: '서두르지 말고 상대방의 입장을 먼저 생각하며 천천히 다가가세요. 진심 어린 대화가 열쇠입니다.'
    }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 2rem;
  color: #fff;
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  perspective: 1000px;
`;

const CardWrapper = styled(motion.div)`
  /* Reduced size for analysis view */
  font-size: 0.35rem; 
  @media (min-width: 768px) { font-size: 0.5rem; }
  
  width: 20em;
  height: 35em;
  position: relative;
`;

const TextContainer = styled(motion.div)`
  width: 90%;
  max-width: 600px;
  min-height: 200px; /* Slightly taller for final result */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TypeLabel = styled.h3`
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 1.5rem;
  color: #E0D4FC;
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

const ResultValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const ResultDesc = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #ddd;
`;

interface AnalysisResultProps {
    selectedCards: number[];
}

export function AnalysisResult({ selectedCards }: AnalysisResultProps) {
    // 0: Start, 1: Flip 1, 2: Text 1, 3: Flip 2, 4: Text 2, 5: Flip 3, 6: Text 3, 7: Final
    const [step, setStep] = useState(0);
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        // Initial delay
        const t0 = setTimeout(() => setStep(1), 1000);
        return () => clearTimeout(t0);
    }, []);

    useEffect(() => {
        if (step === 1 || step === 3 || step === 5) {
            // Card Flip -> Wait then start typing
            const t = setTimeout(() => {
                setStep(prev => prev + 1);
                setTypedText(''); // Reset text for typing
            }, 800);
            return () => clearTimeout(t);
        }

        if (step === 2 || step === 4 || step === 6) {
            const cardIndex = (step / 2) - 1;
            const targetText = ANALYSIS_DATA.cards[cardIndex].desc;
            let charIndex = 0;

            const interval = setInterval(() => {
                charIndex++;
                setTypedText(targetText.slice(0, charIndex));

                if (charIndex >= targetText.length) {
                    clearInterval(interval);
                    // Wait after typing finish then move to next flip or final
                    setTimeout(() => {
                        setStep(prev => prev + 1);
                    }, 2000);
                }
            }, 30); // Faster typing speed

            return () => clearInterval(interval);
        }
    }, [step]);

    // Determine flip status based on step
    const getIsFlipped = (index: number) => {
        if (index === 0) return step >= 1;
        if (index === 1) return step >= 3;
        if (index === 2) return step >= 5;
        return false;
    };

    // Determine current showing text
    const getCurrentTextInfo = () => {
        if (step <= 2) return ANALYSIS_DATA.cards[0];
        if (step <= 4) return ANALYSIS_DATA.cards[1];
        return ANALYSIS_DATA.cards[2];
    };

    const textInfo = getCurrentTextInfo();
    const isFinal = step >= 7;

    return (
        <Container>
            <CardsRow>
                {selectedCards.map((_, i) => (
                    <CardWrapper
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <TarotCard isFlipped={getIsFlipped(i)} />
                    </CardWrapper>
                ))}
            </CardsRow>

            <TextContainer
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 2 ? 1 : 0 }}
            >
                {/* Before Final: Show Typing Text */}
                {!isFinal && step >= 1 && (
                    <motion.div
                        key={textInfo.type} // Re-animate on change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ width: '100%' }}
                    >
                        <TypeLabel>{textInfo.type}</TypeLabel>
                        <TypeText>{typedText}</TypeText>
                    </motion.div>
                )}

                {/* Final Result: Show in same container */}
                {isFinal && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <ResultTitle>최종 분석 결과</ResultTitle>
                        <ResultValue>재회확률 {ANALYSIS_DATA.result.probability}</ResultValue>
                        <ResultDesc>{ANALYSIS_DATA.result.strategy}</ResultDesc>
                    </motion.div>
                )}
            </TextContainer>
        </Container>
    );
}
