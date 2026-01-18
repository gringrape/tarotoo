import { useState, useEffect } from 'react';
import { fetchAnalysis, type AnalysisResponse } from '../api/tarotApi';
import { TAROT_DATA } from '../data/tarotData';

interface UseAnalysisFlowProps {
    theirCards: number[];
    myCards: number[];
}

export function useAnalysisFlow({ theirCards, myCards }: UseAnalysisFlowProps) {
    const [step, setStep] = useState(0);
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

    // 2. Flow Logic
    useEffect(() => {
        if (!analysisData) return;

        // Steps:
        // 1, 3, 5, 7, 9, 11: Flip Animation (Odd)
        // 2, 4, 6, 8, 10, 12: Text Reading (Even)

        const isFlipStep = step % 2 !== 0 && step < 13;
        const isTextStep = step % 2 === 0 && step > 0 && step < 13;

        if (isFlipStep) {
            const t = setTimeout(() => {
                setStep(prev => prev + 1);
            }, 800); // Duration for flip animation
            return () => clearTimeout(t);
        }

        if (isTextStep) {
            // Wait for user "Next" click for all text steps.
            return;
        }
    }, [step, analysisData]);

    // Helper functions for UI
    const getIsFlipped = (group: 'THEIR' | 'MY', index: number) => {
        // logic preserved if needed for legacy, or removed if unused. 
        // Keeping it compatible for now but might be unused if we remove CardSection.
        if (group === 'THEIR') {
            const triggerStep = (index * 2) + 1;
            return step >= triggerStep;
        } else {
            const triggerStep = 7 + (index * 2);
            return step >= triggerStep;
        }
    };

    const nextPhase = () => {
        setStep(prev => prev + 1);
    };

    const getCurrentTextInfo = () => {
        if (!analysisData) return { section: '', name: '', desc: '', cardId: null };

        // For summary phase
        if (step > 12) return { section: '종합 분석', name: '', desc: '', cardId: null };

        const globalCardIndex = Math.max(0, Math.min(Math.floor((step - 1) / 2), 5));

        const isTheirTurn = globalCardIndex < 3;
        const localIndex = isTheirTurn ? globalCardIndex : globalCardIndex - 3;

        const sectionTitle = isTheirTurn ? "나를 향한 상대방의 마음" : "상대방을 향한 나의 마음";
        const cardData = isTheirTurn
            ? analysisData.theirFeelings.cards[localIndex]
            : analysisData.myFeelings.cards[localIndex];

        // Get the actual card ID (0-21)
        const cardId = isTheirTurn ? theirCards[localIndex] : myCards[localIndex];

        return {
            section: sectionTitle,
            name: cardData?.name || '',
            desc: cardData?.desc || '',
            cardId: cardId
        };
    };

    return {
        step,
        loading,
        error,
        analysisData,
        textInfo: getCurrentTextInfo(),
        isFinal: step >= 13,
        isFlipStep: (step % 2 !== 0 && step < 13), // Export this
        getIsFlipped,
        nextPhase
    };
}
