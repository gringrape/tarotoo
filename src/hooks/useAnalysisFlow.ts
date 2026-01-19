import { useAnalysisData } from './useAnalysisData';
import { useAnalysisStepper } from './useAnalysisStepper';
import { useCurrentCardInfo } from './useCurrentCardInfo';

interface UseAnalysisFlowProps {
    theirCards: number[];
    myCards: number[];
    isPaused?: boolean;
    userId: string | null;
}

export function useAnalysisFlow({ theirCards, myCards, isPaused, userId }: UseAnalysisFlowProps) {
    // 1. Data Fetching
    const { analysisData, loading, error, retry } = useAnalysisData({ theirCards, myCards, userId });

    // 2. Step Management
    const { stepIndex: step, currentStep, nextPhase, isFlipStep, isFinal } = useAnalysisStepper({
        isDataReady: !!analysisData && !loading,
        isPaused
    });

    // 3. Current Card Info
    const cardInfo = useCurrentCardInfo({
        currentStep,
        analysisData,
        theirCards,
        myCards
    });

    return {
        step,
        loading,
        error,
        analysisData,
        textInfo: cardInfo || { section: '', name: '', desc: '', cardId: null },
        isFinal,
        isFlipStep,
        nextPhase,
        retry
    };
}


