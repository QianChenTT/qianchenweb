import '../stylesheets/App.css'
import Container from "react-bootstrap/Container";
import Header from "./Header.tsx"
import Body from "./Body.tsx"
import IndexPage from "../pages/IndexPage";

import Meme from "./Meme.tsx";

function App() {
  return (
    <>
        <IndexPage/>
        <Header/>
        <Body />
    </>
  )
}

export default App
