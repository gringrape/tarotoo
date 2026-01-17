import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from './TarotCard';
import { TAROT_DATA } from '../data/tarotData';

const SectionTitle = styled.h3`
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 1.5rem;
  color: #E0D4FC;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  perspective: 1000px;
  flex-wrap: wrap; 
  padding: 0 1rem;
`;

const CardWrapper = styled(motion.div)`
  /* Reduced size for analysis view to fit 6 cards */
  font-size: 0.25rem; 
  @media (min-width: 768px) { font-size: 0.4rem; }
  
  width: 20em;
  height: 35em;
  position: relative;
`;

interface CardSectionProps {
    title: string;
    cards: number[]; // Array of indices in TAROT_DATA
    isFlippedFn: (index: number) => boolean;
    delayStart?: number;
    extraStyle?: React.CSSProperties;
}

export function CardSection({ title, cards, isFlippedFn, delayStart = 0, extraStyle }: CardSectionProps) {
    return (
        <>
            <SectionTitle>{title}</SectionTitle>
            <CardsRow style={extraStyle}>
                {cards.map((cardIndex, i) => (
                    <CardWrapper
                        key={`${title}-${i}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delayStart + (i * 0.1) }}
                    >
                        <TarotCard
                            isFlipped={isFlippedFn(i)}
                            image={TAROT_DATA[cardIndex].image}
                        />
                    </CardWrapper>
                ))}
            </CardsRow>
        </>
    );
}
