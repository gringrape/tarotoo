import { useState, useEffect } from 'react';
import { fetchAnalysis, type AnalysisResponse } from '../api/tarotApi';
import { TAROT_DATA } from '../data/tarotData';

interface UseAnalysisDataProps {
    theirCards: number[];
    myCards: number[];
}

export function useAnalysisData({ theirCards, myCards }: UseAnalysisDataProps) {
    const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAnalysis = async () => {
            try {
                setLoading(true);
                const theirCardNames = theirCards.map(idx => TAROT_DATA[idx].name);
                const myCardNames = myCards.map(idx => TAROT_DATA[idx].name);

                const data = await fetchAnalysis(theirCardNames, myCardNames);
                setAnalysisData(data);
            } catch (err) {
                console.error(err);
                setError('분석 결과를 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        loadAnalysis();
    }, [theirCards, myCards]);

    return { analysisData, loading, error };
}
