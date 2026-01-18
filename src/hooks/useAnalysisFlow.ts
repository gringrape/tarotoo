import { useAnalysisData } from './useAnalysisData';
import { useAnalysisStepper } from './useAnalysisStepper';
import { useCurrentCardInfo } from './useCurrentCardInfo';

interface UseAnalysisFlowProps {
    theirCards: number[];
    myCards: number[];
}

export function useAnalysisFlow({ theirCards, myCards }: UseAnalysisFlowProps) {
    // 1. Data Fetching
    const { analysisData, loading, error } = useAnalysisData({ theirCards, myCards });

    // 2. Step Management
    const { stepIndex: step, currentStep, nextPhase, isFlipStep, isFinal } = useAnalysisStepper({
        isDataReady: !!analysisData && !loading
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
        nextPhase
    };
}


