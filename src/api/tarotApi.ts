export interface AnalysisResponse {
    cards: {
        name: string;
        desc: string;
    }[];
    result: {
        strategy: string;
    };
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000';

export async function fetchAnalysis(selectedCards: string[]): Promise<AnalysisResponse> {
    const response = await fetch(`${API_ENDPOINT}/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedCards }), // Now sending ["The Fool", "The Magician", ...]
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}
