import styled from "styled-components"
import { useState } from "react"
import { CardDeck } from "./components/CardDeck"
import { SandText } from "./components/SandText"
import { AnalysisModal } from "./components/AnalysisModal"
import { AnalysisResult } from "./components/AnalysisResult"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100%;
  background-color: #3E0075;
  color: white;
  padding: 4rem 0;
  box-sizing: border-box;
  overflow: hidden;
`

const Title = styled.h1`
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 3rem;
  margin-bottom: 2rem;
`

function App() {
  const [theirCards, setTheirCards] = useState<number[]>([]);
  const [myCards, setMyCards] = useState<number[]>([]);
  const [phase, setPhase] = useState<'THEIR' | 'MY' | 'ANALYSIS'>('THEIR');

  const handleCardClick = (index: number) => {
    if (phase === 'ANALYSIS') return;

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
    if (phase === 'THEIR') return "나를 향한 상대방의 마음을 떠올리며<br/>카드 세 장을 선택해주세요.";
    return "상대방을 향한 나의 마음을 떠올리며<br/>카드 세 장을 선택해주세요.";
  };

  return (
    <Container>
      <Title>재회타로</Title>

      {phase !== 'ANALYSIS' ? (
        <>
          {currentSelection.length < 3 && <SandText text={getPromptText()} />}
          <CardDeck selectedCards={currentSelection} onCardClick={handleCardClick} />

          <AnalysisModal
            isVisible={isSelectionComplete}
            onConfirm={handleConfirm}
            onCancel={handleReset}
          />
        </>
      ) : (
        <AnalysisResult theirCards={theirCards} myCards={myCards} />
      )}
    </Container>
  )
}

export default App
