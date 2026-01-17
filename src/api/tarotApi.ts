export interface CardAnalysis {
    name: string;
    desc: string;
}

export interface AnalysisSection {
    cards: CardAnalysis[];
    summary: string;
}

export interface AnalysisResponse {
    theirFeelings: AnalysisSection;
    myFeelings: AnalysisSection;
    overallStrategy: string;
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000';

export async function fetchAnalysis(theirCards: string[], myCards: string[]): Promise<AnalysisResponse> {
    const response = await fetch(`${API_ENDPOINT}/api/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theirCards, myCards }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}
