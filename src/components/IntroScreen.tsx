import styled from 'styled-components';

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
  font-size: 4rem;
  color: #fff; /* White */
  margin-bottom: 2rem;
  text-shadow: 0 0 20px rgba(0, 255, 209, 0.5);
`;

const Description = styled.div`
  font-family: 'GounBatang', serif;
  font-size: 1.5rem;
  color: #E0D4FC; /* Light Lavender */
  margin-bottom: 4rem;
  line-height: 1.6;
  opacity: 0.9;
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
  font-size: 1.5rem;
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
`;

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <Container>
      <Title>재회타로</Title>
      <Description>
        <Highlight>당신의 마음</Highlight>과 <Highlight>그 사람의 마음</Highlight>,<br />
        그리고 <Highlight>우리의 운명</Highlight>을 알아보세요.<br />
        <br />
        세 장의 카드가 당신의 이야기를 들려줍니다.
      </Description>
      <StartButton onClick={onStart}>시작하기</StartButton>
    </Container>
  );
}
