import { useState, useEffect } from 'react';

const TIMING = {
    INITIAL_DELAY: 500,
    FLIP_ANIMATION: 1000,
} as const;

export const STEPS = {
    INITIAL: 0,
    CARD_COMPREHENSIVE_ANALYSIS: 13,
    FINAL_STRATEGY: 14,
} as const;

export type SectionType = 'THEIR' | 'MY';
export type ViewType = 'FLIP' | 'READ';

// Rich Step Definition
export type StepDefinition =
    | { type: 'IDLE' }
    | { type: 'READING', section: SectionType, view: ViewType, index: number }
    | { type: 'SUMMARY' }
    | { type: 'STRATEGY' };

// Define the script based on sections
const createStepSequence = (): StepDefinition[] => {
    const steps: StepDefinition[] = [{ type: 'IDLE' }];

    // Section 1: Their Feelings (3 Cards)
    [0, 1, 2].forEach(index => {
        steps.push({ type: 'READING', section: 'THEIR', view: 'FLIP', index });
        steps.push({ type: 'READING', section: 'THEIR', view: 'READ', index });
    });

    // Section 2: My Feelings (3 Cards)
    [0, 1, 2].forEach(index => {
        steps.push({ type: 'READING', section: 'MY', view: 'FLIP', index });
        steps.push({ type: 'READING', section: 'MY', view: 'READ', index });
    });

    steps.push({ type: 'SUMMARY' });
    steps.push({ type: 'STRATEGY' });

    return steps;
};

export const STEP_SEQUENCE = createStepSequence();

interface UseAnalysisStepperProps {
    isDataReady: boolean;
}

export function useAnalysisStepper({ isDataReady }: UseAnalysisStepperProps) {
    const [stepIndex, setStepIndex] = useState(0);

    const currentStep = STEP_SEQUENCE[stepIndex] || { type: 'IDLE' }; // Safe fallback

    const nextPhase = () => setStepIndex(prev => prev + 1);

    // Auto-advance logic based on Step Definition, not index math
    useEffect(() => {
        if (currentStep.type === 'IDLE' && isDataReady) {
            const t = setTimeout(() => setStepIndex(1), TIMING.INITIAL_DELAY);
            return () => clearTimeout(t);
        }

        if (currentStep.type === 'READING' && currentStep.view === 'FLIP') {
            const t = setTimeout(nextPhase, TIMING.FLIP_ANIMATION);
            return () => clearTimeout(t);
        }
    }, [stepIndex, isDataReady, currentStep]); // React to definition changes

    return {
        stepIndex,
        currentStep,
        nextPhase,
        // Computed flags for convenience
        isFlipStep: currentStep.type === 'READING' && currentStep.view === 'FLIP',
        isFinal: currentStep.type === 'SUMMARY' || currentStep.type === 'STRATEGY'
    };
}
