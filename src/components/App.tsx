import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Fade } from 'react-bootstrap';
import '../stylesheets/App.css';
import Header from './Header.tsx';
import Body from './Body.tsx';
import HouseKeeper from './HouseKeeper.tsx';
import IndexPage from './threeCanvas/pages/IndexPage/IndexPage.tsx';
import AudioPlayer from './AudioPlayer.tsx'
import InitPopUp from './InitPopUp.tsx';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollReady, setScrollReady] = useState(true);
  const [playPause, setPlaypause] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const totalPages = 5;
  const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 2, delay: 0 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  // Determine the model based on currentPage
  const getModelForPage = (page: number) => {
    switch (page) {
      case 0: return { name: 'cube', time: 1000 };
      case 1: return { name: 'ball', time: 1000 };
      case 2: return { name: 'wave', time: 1000 };
      case 3: return { name: 'game', time: 1000 };
      case 4: return { name: 'cpac5', time: 1000 };
      case 5: return { name: 'cone', time: 1000 };

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

  const handleEnableAudio = () => {
    setPlaypause(true)
    handleClosePopup()
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollReady]);

  useEffect(() => {
    setShowPopup(true)
  }, []);

  console.log(currentPage);
  return (
    <Container className="Window p-0" fluid>
      <Fade in={showPopup}>
        <Container className="InitPopUp p-0" fluid>
          <InitPopUp onEnableAudio={handleEnableAudio} onClose={handleClosePopup} />
        </Container>
      </Fade>

      <Container className="IndexPage p-0" fluid>
        <IndexPage name={model.name} time={model.time}/>
      </Container>
      <Container className="AudioPlayer p-0 hidden" fluid>
        <AudioPlayer playPause={playPause}/>
      </Container>

      <Fade in={currentPage === 0}>
        <Container className={`Header p-0 ${currentPage === 0 ? '' : 'hidden'}`} fluid>
          <Header />
        </Container>
      </Fade>

      <Fade in={currentPage === 1}>
        <Container className={`HouseKeeper p-0 ${currentPage === 1 ? '' : 'hidden'}`} fluid>
          <HouseKeeper />
        </Container>
      </Fade>
      {/* Add Fade containers for other pages */}
    </Container>
  );
}

export default App;
