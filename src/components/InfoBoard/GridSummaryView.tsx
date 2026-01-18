import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from '../TarotCard';
import { TAROT_DATA } from '../../data/tarotData';
import type { AnalysisSection } from '../../api/tarotApi';
import { ScrollContent, ResultTitle, CardName, ResultDesc } from './styles';

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  width: 100%;
  margin-bottom: 1.5rem;
  justify-items: center;
`;

const SmallCardWrapper = styled.div`
  font-size: 0.25em; /* Very small scale for summary */
  width: 20em;
  height: 35em;
  position: relative;
  
  /* Ensure flip is static (front visible) */
  & > div {
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
    transform-style: preserve-3d;
  }
`;

interface GridSummaryViewProps {
    theirCards: number[];
    myCards: number[];
    theirFeelings: AnalysisSection;
    myFeelings: AnalysisSection;
}

export function GridSummaryView({ theirCards, myCards, theirFeelings, myFeelings }: GridSummaryViewProps) {
    return (
        <ScrollContent key="step-13-grid">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
                style={{ width: '100%' }}
            >
                <ResultTitle>종합 분석 결과</ResultTitle>

                {/* Their Cards Grid */}
                <div style={{ width: '100%', marginBottom: '2rem' }}>
                    <CardName style={{ fontSize: '1.4em', marginBottom: '1rem' }}>나를 향한 상대방의 마음</CardName>
                    <SummaryGrid>
                        {theirCards.map((cardId, i) => (
                            <SmallCardWrapper key={`their-${i}`}>
                                <div>
                                    <TarotCard image={TAROT_DATA[cardId].image} />
                                </div>
                            </SmallCardWrapper>
                        ))}
                    </SummaryGrid>
                    <ResultDesc>{theirFeelings.summary}</ResultDesc>
                </div>

                {/* My Cards Grid */}
                <div style={{ width: '100%', marginBottom: '2rem' }}>
                    <CardName style={{ fontSize: '1.4em', marginBottom: '1rem' }}>상대방을 향한 나의 마음</CardName>
                    <SummaryGrid>
                        {myCards.map((cardId, i) => (
                            <SmallCardWrapper key={`my-${i}`}>
                                <div>
                                    <TarotCard image={TAROT_DATA[cardId].image} />
                                </div>
                            </SmallCardWrapper>
                        ))}
                    </SummaryGrid>
                    <ResultDesc>{myFeelings.summary}</ResultDesc>
                </div>
            </motion.div>
        </ScrollContent>
    );
}
