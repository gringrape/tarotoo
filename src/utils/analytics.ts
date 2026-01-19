import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_GA_ID;

export const initGA = () => {
    if (GA_ID) {
        ReactGA.initialize(GA_ID);
    } else {
        console.warn('GA_ID not found in environment variables');
    }
};

export const trackPageView = (path: string) => {
    if (GA_ID) {
        ReactGA.send({ hitType: "pageview", page: path });
    }
};

export const trackEvent = (category: string, action: string, label?: string) => {
    if (GA_ID) {
        ReactGA.event({
            category,
            action,
            label,
        });
    }
};
