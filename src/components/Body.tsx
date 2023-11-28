import React from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container'
import HouseKeeper from "./HouseKeeper.tsx";
import {Particle} from "./Particle.tsx";
import backgroundImage from "../../public/assets/backgorund-img.png"
import '../stylesheets/Body.css'
const Body = () => {
  return (
    <>
      <Container className="body p-0" fluid>
        {/*<Particle/>*/}
        <Container className="p-0" fluid>
          {/*<Image src="/assets/housekeeper-background.png" fluid/>*/}
          <HouseKeeper/>
        </Container>
        <Container className="body-navbar-container" fluid>
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="first"
          >

            {/*below are tabs*/}
            <Row>
              <Nav variant="pills" className="body-navbar flex-row p-0"  fill justify>
                <Nav.Item>
                  <Nav.Link eventKey="first" className="body-navbar-navlink" >About Me</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="body-navbar-navlink">Skills</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" className="body-navbar-navlink">Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth" className="body-navbar-navlink">Story</Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>
            {/*above are tabs*/}

            {/*below are tab contents*/}
            <Row>
              <Col>
                <Tab.Content>
                  <Tab.Pane eventKey="first"></Tab.Pane>
                  <Tab.Pane eventKey="second">This is an skill page</Tab.Pane>
                  <Tab.Pane eventKey="third">This is an project page</Tab.Pane>
                  <Tab.Pane eventKey="fourth">This is a page for wonderful stories</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
            {/*above are tab contents*/}
          </Tab.Container>
        </Container>
      </Container>
    </>
  )
}

export default Body;