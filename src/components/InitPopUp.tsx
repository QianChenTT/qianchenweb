import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import '../stylesheets/InitPopUp.css'

// @ts-expect-error
// eslint-disable-next-line react/prop-types
const InitPopUp = ({ onEnableAudio, onClose }) => {
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
