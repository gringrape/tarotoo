import styled, { keyframes } from 'styled-components';

const sandScatter = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.8);
    filter: blur(10px);
  }
  100% {
    opacity: 0.8;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

// \n 키워드가 줄바꿈이 되도록
const Wrapper = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3em;
  font-family: 'GounBatang', serif;
  font-size: 1.5rem;
  color: white;
  pointer-events: none;
  white-space: pre-line;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => props.$isVisible ? 1 : 0};
`;

const Char = styled.span<{ $delay: number }>`
  opacity: 0;
  display: inline-block;
  animation: ${sandScatter} 2s forwards;
  animation-delay: ${props => props.$delay}s;
`;

const LineBreak = styled.div`
  flex-basis: 100%;
  height: 0;
`;

interface SandTextProps {
  text: string;
  isVisible?: boolean;
}

export function SandText({ text, isVisible = true }: SandTextProps) {
  return (
    <Wrapper $isVisible={isVisible}>
      {text.split('').map((char, index) =>
        char === '\n' ? (
          <LineBreak key={index} />
        ) : (
          <Char
            key={index}
            $delay={Math.random() * 2} // Random delay between 0 and 2s
          >
            {char === ' ' ? '\u00A0' : char}
          </Char>
        )
      )}
    </Wrapper>
  );
}
