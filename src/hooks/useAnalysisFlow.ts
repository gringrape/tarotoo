import { useState, useEffect } from 'react';
import { fetchAnalysis, type AnalysisResponse } from '../api/tarotApi';
import { TAROT_DATA } from '../data/tarotData';

interface UseAnalysisFlowProps {
    theirCards: number[];
    myCards: number[];
}

export function useAnalysisFlow({ theirCards, myCards }: UseAnalysisFlowProps) {
    const [step, setStep] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 1. Data Fetching
    useEffect(() => {
        const loadAnalysis = async () => {
            try {
                setLoading(true);
                const theirCardNames = theirCards.map(idx => TAROT_DATA[idx].name);
                const myCardNames = myCards.map(idx => TAROT_DATA[idx].name);

                const data = await fetchAnalysis(theirCardNames, myCardNames);
                setAnalysisData(data);

                // Start animation sequence
                setTimeout(() => setStep(1), 500);
            } catch (err) {
                console.error(err);
                setError('분석 결과를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        loadAnalysis();
    }, [theirCards, myCards]);

    // 2. Flow & Typing Logic
    useEffect(() => {
        if (!analysisData) return;

        // Steps that initiate typing (even numbers: 2, 4, 6... 12)
        // Flip steps are odd numbers (1, 3... 11)

        const isFlipStep = step % 2 !== 0 && step < 13;
        const isTextStep = step % 2 === 0 && step > 0 && step < 13;

        if (isFlipStep) {
            const t = setTimeout(() => {
                setStep(prev => prev + 1);
                setTypedText('');
            }, 800);
            return () => clearTimeout(t);
        }

        if (isTextStep) {
            let targetText = "";
            const globalCardIndex = (step / 2) - 1; // 0..5

            if (globalCardIndex < 3) {
                targetText = analysisData.theirFeelings.cards[globalCardIndex].desc;
            } else {
                targetText = analysisData.myFeelings.cards[globalCardIndex - 3].desc;
            }

            let charIndex = 0;
            const interval = setInterval(() => {
                charIndex++;
                setTypedText(targetText.slice(0, charIndex));

                if (charIndex >= targetText.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setStep(prev => prev + 1);
                    }, 2000);
                }
            }, 30);

            return () => clearInterval(interval);
        }
    }, [step, analysisData]);

    // Helper functions for UI
    const getIsFlipped = (group: 'THEIR' | 'MY', index: number) => {
        if (group === 'THEIR') {
            const triggerStep = (index * 2) + 1;
            return step >= triggerStep;
        } else {
            const triggerStep = 7 + (index * 2);
            return step >= triggerStep;
        }
    };

    const getCurrentTextInfo = () => {
        if (!analysisData) return { section: '', name: '', desc: '' };

        const globalCardIndex = Math.max(0, Math.min(Math.floor((step - 1) / 2), 5));

        const isTheirTurn = globalCardIndex < 3;
        const localIndex = isTheirTurn ? globalCardIndex : globalCardIndex - 3;

        const sectionTitle = isTheirTurn ? "나를 향한 상대방의 마음" : "상대방을 향한 나의 마음";
        const cardData = isTheirTurn
            ? analysisData.theirFeelings.cards[localIndex]
            : analysisData.myFeelings.cards[localIndex];

        return {
            section: sectionTitle,
            name: cardData?.name || '',
            desc: cardData?.desc || ''
        };
    };

    return {
        step,
        loading,
        error,
        analysisData,
        typedText,
        textInfo: getCurrentTextInfo(),
        isFinal: step >= 13,
        getIsFlipped
    };
}
