import styled from "styled-components"
import { useState } from "react"
import { IntroScreen } from "./components/IntroScreen"
import { CardDeck } from "./components/CardDeck"
import { SandText } from "./components/SandText"
import { AnalysisModal } from "./components/AnalysisModal"
import { AnalysisResult } from "./components/AnalysisResult"
import backImg from "./assets/background.jpg"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8) 0%,
      transparent 30%,
      transparent 70%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
    url(${backImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 4rem 0;
  box-sizing: border-box;
  overflow: hidden;
`

const Title = styled.h1`
  font-family: 'GounBatang', serif;
  font-size: 3rem;
`

function App() {
  const [theirCards, setTheirCards] = useState<number[]>([]);
  const [myCards, setMyCards] = useState<number[]>([]);
  const [phase, setPhase] = useState<'INTRO' | 'THEIR' | 'MY' | 'ANALYSIS'>('INTRO');

  const handleCardClick = (index: number) => {
    if (phase === 'ANALYSIS' || phase === 'INTRO') return;

    const isTheirTurn = phase === 'THEIR';
    const currentCards = isTheirTurn ? theirCards : myCards;
    const setCards = isTheirTurn ? setTheirCards : setMyCards;

    if (currentCards.includes(index)) {
      setCards(prev => prev.filter(i => i !== index));
    } else if (currentCards.length < 3) {
      setCards(prev => [...prev, index]);
    }
  };

  const handleReset = () => {
    if (phase === 'THEIR') {
      setTheirCards([]);
    } else if (phase === 'MY') {
      setMyCards([]);
    }
  };

  const handleConfirm = () => {
    if (phase === 'THEIR') {
      setPhase('MY');
    } else {
      setPhase('ANALYSIS');
    }
  };

  const currentSelection = phase === 'THEIR' ? theirCards : myCards;
  const isSelectionComplete = currentSelection.length === 3;

  // Dynamic Title/Prompt based on phase
  const getPromptText = () => {
    if (phase === 'THEIR') return "나를 향한 상대방의 마음을 떠올리며\n 카드 세 장을 선택해주세요.";
    return "상대방을 향한 나의 마음을 떠올리며\n 카드 세 장을 선택해주세요.";
  };

  if (phase === 'INTRO') {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <IntroScreen onStart={() => setPhase('THEIR')} />
      </Container>
    );
  }

  return (
    <Container>
      <Title>재회타로</Title>

      {phase !== 'ANALYSIS' ? (
        <>
          <SandText
            text={getPromptText()}
            isVisible={currentSelection.length === 0}
          />
          <CardDeck selectedCards={currentSelection} onCardClick={handleCardClick} />

          <AnalysisModal
            isVisible={isSelectionComplete}
            onConfirm={handleConfirm}
            onCancel={handleReset}
            message={phase === 'THEIR' ? "다음으로 진행할까요?" : "분석을 시작할까요?"}
            confirmText={phase === 'THEIR' ? "네" : "분석하기"}
          />
        </>
      ) : (
        <AnalysisResult theirCards={theirCards} myCards={myCards} />
      )}
    </Container>
  )
}

export default App
