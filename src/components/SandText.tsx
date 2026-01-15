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

const Wrapper = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 0.1em;
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 1.5rem;
  color: white;
  pointer-events: none;
  white-space: nowrap;
`;

const Char = styled.span<{ $delay: number }>`
  opacity: 0;
  display: inline-block;
  animation: ${sandScatter} 2s forwards;
  animation-delay: ${props => props.$delay}s;
`;

interface SandTextProps {
    text: string;
}

export function SandText({ text }: SandTextProps) {
    return (
        <Wrapper>
            {text.split('').map((char, index) => (
                <Char
                    key={index}
                    $delay={Math.random() * 2} // Random delay between 0 and 2s
                >
                    {char === ' ' ? '\u00A0' : char}
                </Char>
            ))}
        </Wrapper>
    );
}
