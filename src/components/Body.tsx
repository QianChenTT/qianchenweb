import React from 'react'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import HouseKeeper from './HouseKeeper/HouseKeeper.tsx'
import IndexPage from './threeCanvas/pages/IndexPage/IndexPage.tsx'
// import backgroundImage from '../../public/assets/backgorund-img.png'
import '../stylesheets/Body.css'
const Body = () => {
  return (
    <>
      <Container className="p-0" fluid>
        <HouseKeeper/>
      </Container>
    </>
  )
}

export default Body
