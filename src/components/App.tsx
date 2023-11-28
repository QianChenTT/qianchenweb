import '../stylesheets/App.css'
import Container from "react-bootstrap/Container";
import Header from "./Header.tsx"
import Body from "./Body.tsx"

import Meme from "./Meme.tsx";

function App() {
  return (
    <>
      <Container className="general-container" fluid>
        <Header/>
        <Body />
      </Container>
    </>
  )
}

export default App
