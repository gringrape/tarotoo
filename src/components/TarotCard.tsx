
import styled from 'styled-components';
import { TarotBackDesign } from './TarotBackDesign';
import tarotImg from '../assets/tarot-1.png';

// Scene: 3D 공간의 원근감을 정의합니다.
const Scene = styled.div`
  width: 20em;
  aspect-ratio: 20 / 35;
  perspective: 1000px; /* 관찰자 시점의 거리 */
`;

// Card: 실제 회전하는 컨테이너입니다.
const Card = styled.div<{ isFlipped?: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1); /* 부드러운 회전 애니메이션 */
  transform-style: preserve-3d; /* 3D 자식 요소 보존 */
  transform: ${({ isFlipped }) => isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

// CardFace: 앞/뒷면의 공통 스타일입니다.
const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 뒤집혔을 때 뒷면 숨김 */
  -webkit-backface-visibility: hidden;
  border-radius: 1em;
  overflow: hidden;
`;

// CardFaceBack: 현재 디자인(패턴)이 있는 면입니다. 기본값 0도.
const CardFaceBack = styled(CardFace)`
  background-color: #1a233a;
  box-shadow: 0 0 1.875em rgba(0,0,0,0.8);
  border: 0.125em solid #555;
  box-sizing: border-box;
  transform: rotateY(0deg); /* 명시적 지정 */
`;

// CardFaceFront: 타로 이미지(앞면)가 있는 면입니다. 기본값 180도 회전.
const CardFaceFront = styled(CardFace)`
  background-color: #fff;
  transform: rotateY(180deg);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardBorder = styled.div`
  position: absolute;
  top: 0.75em; left: 0.75em; right: 0.75em; bottom: 0.75em;
  border: 0.125em solid #ffffff;
  border-radius: 0.5em;
  pointer-events: none;
  z-index: 10;
  box-shadow: inset 0 0 0.625em rgba(0,0,0,0.5);

  &::after {
    content: '';
    position: absolute;
    top: 0.1875em; left: 0.1875em; right: 0.1875em; bottom: 0.1875em;
    border: 0.0625em dashed rgba(255,255,255,0.5);
    border-radius: 0.3125em;
  }
`;

interface TarotCardProps {
  isFlipped?: boolean;
}

export function TarotCard({ isFlipped = false }: TarotCardProps) {
  return (
    <Scene>
      <Card isFlipped={isFlipped}>
        <CardFaceBack>
          <CardBorder />
          <TarotBackDesign />
        </CardFaceBack>
        <CardFaceFront>
          <img src={tarotImg} alt="Tarot Card Front" />
        </CardFaceFront>
      </Card>
    </Scene>
  );
}
