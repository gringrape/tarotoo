import { useState, useEffect } from 'react';
import { fetchAnalysis, type AnalysisResponse } from '../api/tarotApi';
import { TAROT_DATA } from '../data/tarotData';

interface UseAnalysisDataProps {
    theirCards: number[];
    myCards: number[];
    userId: string | null;
}

export function useAnalysisData({ theirCards, myCards, userId }: UseAnalysisDataProps) {
    const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryTrigger, setRetryTrigger] = useState(0);

    useEffect(() => {
        const loadAnalysis = async () => {
            if (!userId) return; // Wait for user ID

            try {
                setLoading(true);
                setError(null);
                const theirCardNames = theirCards.map(idx => TAROT_DATA[idx].name);
                const myCardNames = myCards.map(idx => TAROT_DATA[idx].name);

                const data = await fetchAnalysis(userId, theirCardNames, myCardNames);
                setAnalysisData(data);
            } catch (err: any) {
                console.error(err);
                if (err.message === 'Insufficient credits') {
                    setError('CREDIT_LIMIT');
                } else {
                    setError('분석 결과를 불러오는데 실패했습니다.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadAnalysis();
    }, [theirCards, myCards, userId, retryTrigger]);

    return { analysisData, loading, error, retry: () => setRetryTrigger(prev => prev + 1) };
}
