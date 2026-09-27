import React from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import '../stylesheets/Header.css'

// Constant content: defined outside the component so its identity is stable across renders
const subtitles = [
  'Computer Engineering',
  'University Of Waterloo',
  'Cyber Security'
];

const baseTypingSpeed = 100;

const Header = () => {
  // subtitle typing effect: type the subtitle, hold, delete it, move to the next one
  const [displayText, setDisplayText] = React.useState('');
  const [subtitleIndex, setSubtitleIndex] = React.useState(0);

  React.useEffect(() => {
    const currentDisplay = subtitles[subtitleIndex];
    const printTimeouts: Array<ReturnType<typeof setTimeout>> = [];

    for (let i = 0; i < currentDisplay.length; i++) {
      printTimeouts.push(setTimeout(() => {
        setDisplayText(prev => prev + currentDisplay[i]);
      }, i * baseTypingSpeed));
    }

    for (let i = 0; i < currentDisplay.length; i++) {
      printTimeouts.push(setTimeout(() => {
        setDisplayText(prev => prev.slice(0, prev.length - 1));
      }, i * baseTypingSpeed + 4000));
    }

    printTimeouts.push(setTimeout(() => {
      setSubtitleIndex(prev => (prev + 1) % subtitles.length);
    }, 2 * (currentDisplay.length - 1) * baseTypingSpeed + 3000));

    return () => {
      printTimeouts.forEach(clearTimeout)
    }
  }, [subtitleIndex]);

  return (
    <Container className="header p-0" fluid>
      <Container className="header-titles" fluid>
        <Row>
          <h1 className="header-title"> Han </h1>
        </Row>
        <Row>
          <h2 className="header-subtitle"> {'~ han$ ' + displayText} </h2><div className="blinking-caret"></div>
        </Row>
      </Container>
    </Container>
  )
}

export default Header;
