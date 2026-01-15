import styled from "styled-components"
import { useState } from "react"
import { CardDeck } from "./components/CardDeck"
import { SandText } from "./components/SandText"
import { AnalysisModal } from "./components/AnalysisModal"

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
  const [selectedCards, setSelectedCards] = useState<number[]>([])

  const handleCardClick = (index: number) => {
    setSelectedCards(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      }
      if (prev.length < 3) {
        return [...prev, index]
      }
      return prev
    })
  }

  const handleReset = () => {
    setSelectedCards([]);
  };

  const handleConfirm = () => {
    console.log("Analysis started with cards:", selectedCards);
    // TODO: Navigate to analysis page or trigger logic
  };

  return (
    <Container>
      <Title>재회타로</Title>
      {selectedCards.length === 0 && <SandText text="운명의 카드를 세장 선택해주세요." />}
      <CardDeck selectedCards={selectedCards} onCardClick={handleCardClick} />

      <AnalysisModal
        isVisible={selectedCards.length === 3}
        onConfirm={handleConfirm}
        onCancel={handleReset}
      />
    </Container>
  )
}

export default App
