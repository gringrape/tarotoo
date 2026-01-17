import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TarotCard } from './TarotCard';
import { TAROT_DATA } from '../data/tarotData';
import { fetchAnalysis, type AnalysisResponse } from '../api/tarotApi';

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
  min-height: 200px;
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
    selectedCards: number[];
}

export function AnalysisResult({ selectedCards }: AnalysisResultProps) {
    // 0: Start, 1: Flip 1, 2: Text 1, 3: Flip 2, 4: Text 2, 5: Flip 3, 6: Text 3, 7: Final
    const [step, setStep] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAnalysis = async () => {
            try {
                setLoading(true);
                // Convert indices to card names
                const selectedCardNames = selectedCards.map(idx => TAROT_DATA[idx].name);
                const data = await fetchAnalysis(selectedCardNames);
                setAnalysisData(data);

                // Start animation sequence after data is loaded
                setTimeout(() => setStep(1), 500);
            } catch (err) {
                console.error(err);
                setError('분석 결과를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        loadAnalysis();
    }, [selectedCards]);

    useEffect(() => {
        if (!analysisData) return;

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
            // Use API data for description
            const targetText = analysisData.cards[cardIndex].desc;
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
    }, [step, analysisData]);

    // Determine flip status based on step
    const getIsFlipped = (index: number) => {
        if (index === 0) return step >= 1;
        if (index === 1) return step >= 3;
        if (index === 2) return step >= 5;
        return false;
    };

    // Determine current showing text
    const getCurrentTextInfo = () => {
        if (!analysisData) return { type: '', name: '', desc: '' };

        const cardIndex = Math.min(Math.floor((step - 1) / 2), 2);
        if (cardIndex < 0) return { type: '운명을 읽는 중...', name: '', desc: '' };

        const types = ['과거', '현재', '미래'];

        // Use name from API response as requested
        return {
            type: types[cardIndex],
            name: analysisData.cards[cardIndex].name,
            desc: analysisData.cards[cardIndex].desc
        };
    };

    const textInfo = getCurrentTextInfo();
    const isFinal = step >= 7;

    if (loading) {
        return (
            <Container>
                <CardsRow>
                    {selectedCards.map((cardIndex, i) => (
                        <CardWrapper
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            {/* Initially face down while loading */}
                            <TarotCard isFlipped={false} image={TAROT_DATA[cardIndex].image} />
                        </CardWrapper>
                    ))}
                </CardsRow>
                <TextContainer>
                    <LoadingText>운명을 분석하고 있습니다...</LoadingText>
                </TextContainer>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <TextContainer>
                    <TypeText>{error}</TypeText>
                </TextContainer>
            </Container>
        );
    }

    return (
        <Container>
            <CardsRow>
                {selectedCards.map((cardIndex, i) => (
                    <CardWrapper
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <TarotCard
                            isFlipped={getIsFlipped(i)}
                            image={TAROT_DATA[cardIndex].image}
                        />
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
                        <CardName>{textInfo.name}</CardName>
                        <TypeText>{typedText}</TypeText>
                    </motion.div>
                )}

                {/* Final Result: Show in same container */}
                {isFinal && analysisData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring' }}
                    >
                        <ResultTitle>최종 분석 결과</ResultTitle>
                        {/* Probability removed as requested */}
                        <ResultDesc>{analysisData.result.strategy}</ResultDesc>
                    </motion.div>
                )}
            </TextContainer>
        </Container>
    );
}
