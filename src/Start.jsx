import React, { useState } from "react";
import { SpeechRecognition } from "./SpeechRecognition";

export const Start = () => {
  const [mostrarSpeechRecognition, setMostrarSpeechRecognition] = useState(false);
  const [botonVisible, setBotonVisible] = useState(true);

  const handleClick = () => {
    setBotonVisible(false);
    setMostrarSpeechRecognition(true);
  };

  return (
    <div>
      { botonVisible && <button onClick={handleClick}>Iniciar</button> }
      {mostrarSpeechRecognition && <SpeechRecognition />}
    </div>
  );
};


