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

const Char = styled.span<{ $delay: number; $isHighlight?: boolean }>`
  opacity: 0;
  display: inline-block;
  animation: ${sandScatter} .5s forwards;
  animation-delay: ${props => props.$delay}s;
  
  ${props => props.$isHighlight && `
    color: #00FFD1;
    font-weight: bold;
  `}
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
  // Parse text for highlights: "normal *highlight* normal"
  // Split by "*" -> ["normal ", "highlight", " normal"]
  const segments = text.split('*');

  // Convert to flat list of characters with highlight info
  const charList: { char: string; isHighlight: boolean }[] = [];

  segments.forEach((seg, i) => {
    const isHighlight = i % 2 === 1; // Odd indices are highlighted parts
    const chars = seg.split('');
    chars.forEach(c => charList.push({ char: c, isHighlight }));
  });

  return (
    <Wrapper $isVisible={isVisible}>
      {charList.map((item, index) =>
        item.char === '\n' ? (
          <LineBreak key={index} />
        ) : (
          <Char
            key={index}
            $delay={.5} // Random delay between 0 and 2s (fixed at .5 for now per original code)
            $isHighlight={item.isHighlight}
          >
            {item.char === ' ' ? '\u00A0' : item.char}
          </Char>
        )
      )}
    </Wrapper>
  );
}
