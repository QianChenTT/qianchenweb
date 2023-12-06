import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import '../stylesheets/InitPopUp.css'

const InitPopUp = ({ onEnableAudio, onClose }) => {

  return (
    <Container className="popup p-0" onClick={onClose} fluid>
      <Container className="popup-content">
        <button onClick={onEnableAudio}>Enable Audio</button>
        <p>Click anywhere to skip</p>
      </Container>
    </Container>
  );
};

export default InitPopUp;
