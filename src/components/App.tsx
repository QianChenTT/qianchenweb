import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade';
import '../stylesheets/App.css';
import Header from './Header.tsx';
import Body from './Body.tsx';
import HouseKeeper from './HouseKeeper.tsx';
import IndexPage from './threeCanvas/pages/IndexPage/IndexPage.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollReady, setScrollReady] = useState(true);
  const totalPages = 5;

  // Determine the model based on currentPage
  const getModelForPage = (page: number) => {
    switch (page) {
      case 0: return { name: 'cube', time: 1000 };
      case 1: return { name: 'ball', time: 1000 };
      default: return { name: '', time: 1000 };
    }
  };

  const model = getModelForPage(currentPage);

  // Function for handling page logic
  const pageHandler = (scrollDown: boolean) => {
    if (scrollReady) {
      setScrollReady(false);
      setTimeout(() => setScrollReady(true), 1500); // Adjust timeout as needed

      let newPage = currentPage;
      if (scrollDown && currentPage < totalPages) {
        newPage = currentPage + 1;
      } else if (!scrollDown && currentPage > 0) {
        newPage = currentPage - 1;
      }

      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    }
  };

  // Scroll event listener
  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    const scrollDown = event.deltaY > 0;
    pageHandler(scrollDown);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollReady]);

  console.log(currentPage);

  return (
    <Container className="Window p-0" fluid>
      <Container className="IndexPage p-0" fluid>
        <IndexPage name={model.name} time={model.time}/>
      </Container>
      <Fade in={currentPage === 0}>
        <Container className={`Header p-0 ${currentPage !== 0 ? 'hidden' : ''}`} fluid>
          <Header />
        </Container>
      </Fade>
      <Fade in={currentPage === 1}>
        <Container className={`Body p-0 ${currentPage !== 1 ? 'hidden' : ''}`} fluid>
          <HouseKeeper />
        </Container>
      </Fade>
      {/* Add Fade containers for other pages */}
    </Container>
  );
}

export default App;
