import { useState, useEffect } from 'react';
import { createUser } from '../api/tarotApi';

const STORAGE_KEY = 'tarot_user_id';
const CREDITS_KEY = 'tarot_user_credits';

export function useUser() {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem(STORAGE_KEY));
    const [credits, setCredits] = useState<number>(parseInt(localStorage.getItem(CREDITS_KEY) || '0', 10));

    useEffect(() => {
        const initUser = async () => {
            const existingId = localStorage.getItem(STORAGE_KEY);
            if (existingId) {
                setUserId(existingId);
                // Optionally verify with server or just trust local storage for mock
                return;
            }

            try {
                const data = await createUser();
                setUserId(data.userId);
                setCredits(data.credits);
                localStorage.setItem(STORAGE_KEY, data.userId);
                localStorage.setItem(CREDITS_KEY, data.credits.toString());
            } catch (error) {
                console.error('Failed to create user:', error);
            }
        };

        initUser();
    }, []);

    const updateCredits = (newCredits: number) => {
        setCredits(newCredits);
        localStorage.setItem(CREDITS_KEY, newCredits.toString());
    };

    return { userId, credits, updateCredits };
}
