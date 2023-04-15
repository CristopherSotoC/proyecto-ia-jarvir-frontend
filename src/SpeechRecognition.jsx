import React, { useState } from 'react';
import { useEffect } from 'react';

export const SpeechRecognition = () => {
  const [textoReconocido, setTextoReconocido] = useState('');
  const [tempTextoReconocido, setTempTextoReconocido] = useState('');

  const reconocimientoDeVoz = () => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setTempTextoReconocido(transcript);
    });

    recognition.addEventListener('end', recognition.start);

    recognition.start();
  };

  useEffect(() => {
    console.log(tempTextoReconocido)

  }, [tempTextoReconocido])
  

  const guardarTexto = () => {
    setTextoReconocido(tempTextoReconocido);
    setTempTextoReconocido('');
  };

  return (
    <div>
      <button onClick={reconocimientoDeVoz}>Habla</button>
      <button onClick={guardarTexto}>Guardar</button>
      <p>Lo que dijiste: {textoReconocido}</p>
    </div>
  );
};



