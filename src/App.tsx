import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`

const LogoLink = styled.a`
  &:nth-of-type(2) img {
    @media (prefers-reduced-motion: no-preference) {
      animation: ${logoSpin} infinite 20s linear;
    }
  }
`

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`

const Card = styled.div`
  padding: 2em;
`

const ReadTheDocs = styled.p`
  color: #888;
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
      <div>
        <LogoLink href="https://vite.dev" target="_blank">
          <Logo src={viteLogo} alt="Vite logo" />
        </LogoLink>
        <LogoLink href="https://react.dev" target="_blank">
          <Logo src={reactLogo} className="react" alt="React logo" />
        </LogoLink>
      </div>
      <h1>Vite + React</h1>
      <Card>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>
      <ReadTheDocs>
        Click on the Vite and React logos to learn more
      </ReadTheDocs>
    </Container>
  )
}

export default App
