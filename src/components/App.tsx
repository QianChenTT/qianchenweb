import React, { useState, useEffect, useRef, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import { motion, AnimatePresence } from 'framer-motion';
import '../stylesheets/App.css';
import Header from './Header.tsx';
import Body from './Body.tsx';
import HouseKeeper from './HouseKeeper/HouseKeeper.tsx';
import IndexPage from './threeCanvas/pages/IndexPage/IndexPage.tsx';

const totalPages = 5;

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollReady, setScrollReady] = useState(true);
  const fadeInOut = useMemo(() => ({
    initial: { opacity: 0 },
    fastAnimation: { opacity: 1, transition: { duration: 0.5, delay: 0 } },
    slowAnimation: { opacity: 1, transition: { duration: 0.5, delay: 0 } },
    slowExit: { opacity: 0, transition: { duration: 1, delay: 0 } },
    fastExit: { opacity: 0, transition: { duration: 0, delay: 0 } }
  }), []);

  // Determine the model based on currentPage
  const getModelForPage = (page: number) => {
    switch (page) {
      case 0: return { name: 'boi2o1', time: 1000 };
      case 1: return { name: 'boi1o1', time: 1000 };
      case 2: return { name: 'sampleFunction', time: 1000 };
      case 3: return { name: 'game', time: 1000 };
      case 4: return { name: 'cpac5', time: 1000 };
      case 5: return { name: 'cone', time: 1000 };

      default: return { name: '', time: 1000 };
    }
  };

  // @ts-expect-error
  const model = getModelForPage(currentPage);

  // effect for scrolling: handlers live inside the effect so they always see this render's state
  useEffect(() => {
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

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollReady, currentPage]);

  console.log(currentPage);
  console.log(getModelForPage(currentPage))
  return (
    <Container className="Window p-0" fluid>
      <Container className="IndexPage p-0" fluid>
        <IndexPage name={model.name} time={model.time} />
      </Container>
      <Container className="HouseKeeper p-0">
        <HouseKeeper/>
      </Container>

      <AnimatePresence>
        {currentPage === 0 && (
          <Container className="Header p-0" fluid key="header">
            <motion.div variants={fadeInOut} initial="initial" animate="fastAnimation" exit="fastExit">
              <Header />
            </motion.div>
          </Container>
        )}

        {currentPage === 1 && (
          <Container className=" p-0" fluid key="housekeeper">
            <motion.div variants={fadeInOut} initial="initial" animate="fastAnimation" exit="fastExit">
            </motion.div>
          </Container>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default App;
