import styled from 'styled-components';
import { theme } from '../styles/designSystem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'GounBatang', serif;
  font-size: ${theme.typography.heading.desktop};
  color: #fff; /* White */
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(0, 255, 209, 0.5);

  ${theme.media.mobile} {
    font-size: ${theme.typography.heading.mobile};
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'GounBatang', serif;
  font-size: ${theme.typography.body.desktop};
  color: #E0D4FC; /* Light Lavender */
  margin-bottom: 4rem;
  line-height: 1.6;
  opacity: 0.9;

  ${theme.media.mobile} {
    font-size: ${theme.typography.body.mobile};
    margin-bottom: 2rem;
  }
`;

const Highlight = styled.span`
  color: #00FFD1;
  font-weight: bold;
`;

const StartButton = styled.button`
  background: #00FFD1; /* Mint */
  color: #333; /* Dark text for contrast */
  border: none;
  padding: 1rem 4rem;
  font-size: ${theme.typography.button.desktop};
  border-radius: 50px;
  cursor: pointer;
  font-family: 'GounBatang', serif;
  box-shadow: 0 4px 15px rgba(0, 255, 209, 0.3);
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background: #00cca7;
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(0, 255, 209, 0.6);
  }

  ${theme.media.mobile} {
    font-size: ${theme.typography.button.mobile};
    padding: 0.8rem 2.5rem;
  }
`;

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <Container>
      <Title>재회타로</Title>
      <Description>
        <div>
          <Highlight>나의 마음</Highlight>과 <Highlight>상대방의 마음</Highlight>을 떠올리며,
        </div>
        <div>
          <Highlight>카드를</Highlight> 선택해봅시다.
        </div>
      </Description>
      <StartButton onClick={onStart}>시작하기</StartButton>
    </Container>
  );
}
