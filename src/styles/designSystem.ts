export const theme = {
    colors: {
        primary: '#00FFD1', // Mint/Teal
        primaryHover: '#00ccfe', // Slightly bluer mint for hover, or darker mint '#00cca7'
        primaryShadow: 'rgba(0, 255, 209, 0.5)',

        secondary: '#6A0dad', // Deep Purple
        secondaryHover: '#800080',
        secondaryShadow: 'rgba(106, 13, 173, 0.5)',

        text: {
            main: '#ffffff',
            dark: '#333333', // For use on Light/Mint backgrounds
            highlight: '#00FFD1',
            sub: '#E0D4FC', // Light Lavender
        },

        background: {
            modal: 'rgba(20, 10, 40, 0.95)',
            overlay: 'rgba(0, 0, 0, 0.7)',
        },

        border: 'rgba(255, 255, 255, 0.2)',
    },

    fonts: {
        main: "'GounBatang', serif",
    },

    media: {
        mobile: '@media (max-width: 768px)',
        tablet: '@media (max-width: 1024px)',
    },

    typography: {
        heading: {
            desktop: '4rem',
            mobile: '3rem',
        },
        subTitle: {
            desktop: '2rem',
            mobile: '1.4rem',
        },
        body: {
            desktop: '1.5rem',
            mobile: '1.3rem',
        },
        button: {
            desktop: '1.5rem',
            mobile: '1.2rem',
        }
    }
};
