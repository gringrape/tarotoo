import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TarotCard } from '../TarotCard';
import { TAROT_DATA } from '../../data/tarotData';
import { theme } from '../../styles/designSystem';
import { RowWrapper, LeftCol, RightCol, TypeLabel, CardName, TypeText } from './styles';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  ${theme.media.mobile} {
    margin-bottom: 0.5rem;
  }
`;

const CardDisplay = styled(motion.div)`
  font-size: 0.6em; /* Scale relative to container */
  width: 20em; /* Matches TarotCard width in ems */
  height: 35em; /* Matches TarotCard aspect ratio */
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  flex-shrink: 0;

  ${theme.media.mobile} {
    font-size: 0.3em; /* 50% smaller than 0.6em */
  }
`;

interface SingleCardViewProps {
    cardId: number;
    section: string;
    name: string;
    desc: string;
    isFlipStep: boolean;
}

export function SingleCardView({ cardId, section, name, desc, isFlipStep }: SingleCardViewProps) {
    return (
        <ContentWrapper key={cardId}>
            {/* Header: Section Title */}
            {/* Header: Section Title */}
            <TitleWrapper>
                <TypeLabel>{section}</TypeLabel>
            </TitleWrapper>

            <CardName>{name}</CardName>
            <RowWrapper>
                {/* Left Column: Name + Card */}
                <LeftCol>
                    <CardDisplay
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 180 }}
                        transition={{ duration: 1.2, type: "spring" }}
                    >
                        <TarotCard image={TAROT_DATA[cardId].image} />
                    </CardDisplay>
                </LeftCol>

                {/* Right Column: Description */}
                <RightCol>
                    <TypeText
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isFlipStep ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {desc}
                    </TypeText>
                </RightCol>
            </RowWrapper>
        </ContentWrapper>
    );
}
