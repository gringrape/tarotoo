export interface CardAnalysis {
    name: string;
    desc: string;
}

export interface AnalysisSection {
    cards: CardAnalysis[];
    summary: string;
}

// ... (interfaces remain same)

export interface AnalysisResponse {
    theirFeelings: AnalysisSection;
    myFeelings: AnalysisSection;
    overallStrategy: string;
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT ?? 'http://localhost:3000';

export async function createUser(): Promise<{ userId: string; credits: number }> {
    const response = await fetch(`${API_ENDPOINT}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
}

export async function registerEmail(userId: string, email: string): Promise<{ success: boolean; credits: number }> {
    const response = await fetch(`${API_ENDPOINT}/api/users/register-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email }),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to register email');
    }
    return response.json();
}

export async function fetchAnalysis(userId: string, theirCards: string[], myCards: string[]): Promise<AnalysisResponse> {
    const response = await fetch(`${API_ENDPOINT}/api/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, theirCards, myCards }),
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('Insufficient credits');
        }
        throw new Error('Network response was not ok');
    }

    return response.json();
}
