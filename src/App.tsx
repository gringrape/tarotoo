import styled from "styled-components"
import { CardDeck } from "./components/CardDeck"

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

const FooterMessage = styled.div`
  position: absolute;
  bottom: 250px; /* Above the cards */
  color: white;
  font-size: 1.2rem;
  opacity: 0.8;
  z-index: 0;
`

function App() {
  return (
    <Container>
      <Title>재회타로</Title>
      <FooterMessage>운명의 카드를 선택해 주세요</FooterMessage>
      <CardDeck />
    </Container>
  )
}

export default App
