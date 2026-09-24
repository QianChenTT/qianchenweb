import React from 'react'
import Container from 'react-bootstrap/Container';
import '../stylesheets/InitPopUp.css'

interface InitPopUpProps {
  onEnableAudio: () => void;
  onClose: () => void;
}

const InitPopUp = ({ onEnableAudio, onClose }: InitPopUpProps) => {
  return (
    <Container className="popup p-0" onClick={onClose} fluid>
      <Container className="popup-content">
        <button onClick={onEnableAudio} className="enable-audio"></button>
        <p>Enable Audio</p>
        <p>Click anywhere to skip</p>
      </Container>
    </Container>
  );
};

export default InitPopUp;
