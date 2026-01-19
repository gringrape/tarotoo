import type { AnalysisResponse } from '../api/tarotApi';
import type { StepDefinition, SectionType } from './useAnalysisStepper';

interface UseCurrentCardInfoProps {
    currentStep: StepDefinition;
    analysisData: AnalysisResponse | null;
    theirCards: number[];
    myCards: number[];
}

// Define explicit configuration for each section
const SECTION_CONFIG: Record<SectionType, {
    title: string;
    getData: (data: AnalysisResponse) => { cards: { name: string; desc: string }[] };
    getCardIds: (props: UseCurrentCardInfoProps) => number[];
}> = {
    THEIR: {
        title: "나를 향한 상대방의 마음",
        getData: (data) => data.theirFeelings,
        getCardIds: (props) => props.theirCards,
    },
    MY: {
        title: "상대방을 향한 나의 마음",
        getData: (data) => data.myFeelings,
        getCardIds: (props) => props.myCards,
    }
};

export function useCurrentCardInfo(props: UseCurrentCardInfoProps) {
    const { currentStep, analysisData } = props;

    // Guard: Only process for READING steps with valid data
    if (!analysisData || currentStep.type !== 'READING') {
        return null;
    }

    // 1. Get Configuration by Section
    const config = SECTION_CONFIG[currentStep.section];

    // 2. Resolve Data using Configuration
    // No more `isTheirTurn ? ... : ...`
    const sectionTitle = config.title;
    const cardSectionData = config.getData(analysisData);
    const cardIdList = config.getCardIds(props);

    // 3. Retrieve Specific Card Match
    const cardData = cardSectionData.cards[currentStep.index];
    const cardId = cardIdList[currentStep.index];

    if (!cardData) return null;

    return {
        section: sectionTitle,
        name: cardData.name,
        desc: cardData.desc,
        cardId
    };
}
