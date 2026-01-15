import styled from "styled-components"
import { useState } from "react"
import { TarotCard } from "./components/TarotCard"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100%;
  background-color: #3E0075;
  color: white;
  padding: 4rem 0;
  box-sizing: border-box;
`

const Title = styled.h1`
  font-family: 'KerisKeduLine', sans-serif;
  font-size: 3rem;
  margin-bottom: 2rem;
`

const CardWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13em;
`

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  background-color: #fff;
  color: #3E0075;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`

function App() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Container>
      <Title>재회타로</Title>
      <CardWrapper>
        <TarotCard isFlipped={isFlipped} />
      </CardWrapper>
      <Button onClick={() => setIsFlipped(!isFlipped)}>
        {isFlipped ? "카드 덮기" : "카드 뒤집기"}
      </Button>
    </Container>
  )
}

export default App
