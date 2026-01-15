import styled from "styled-components"
import { TarotBoard } from "./components/TarotBoard"

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
  return (
    <Container>
      <Title>재회타로</Title>
      <TarotBoard />
    </Container>
  )
}

export default App
