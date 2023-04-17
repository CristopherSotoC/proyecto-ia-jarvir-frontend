import React, { useState, useEffect } from 'react';

export const SpeechRecognition = () => {
  const [textoReconocido, setTextoReconocido] = useState('');
  const [grabando, setGrabando] = useState(false);

  const opciones = [
    'Clasificar si un cliente se va a pasar de compañía',
    'Clasificar la calidad del vino',
    'Predecir precio de un automóvil',
    'Predecir precio del aguacate',
    'Predecir el porcentaje de grasa de un adulto',
    'Recomendar películas',
  ];

  const saludar = () => {
    const saludo = new SpeechSynthesisUtterance();
    saludo.text =
      'Hola, ¿en qué puedo ayudarte? Estas son las opciones disponibles:';
    // opciones.forEach((opcion, index) => {
    //   saludo.text += ` ${index + 1}. ${opcion}.`;
    // });
    window.speechSynthesis.speak(saludo);
  };

  const reconocimientoDeVoz = () => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setTextoReconocido(transcript);
    });

    recognition.addEventListener('end', () => {
      setGrabando(false);
      recognition.stop();
    });

    setGrabando(true);
    recognition.start();
  };

  useEffect(() => {
    saludar();
  }, []);

  useEffect(() => {
    console.log(textoReconocido);
  }, [textoReconocido]);

  return (
    <div>
      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none' }}>
        {opciones.map((opcion, index) => (
          <li key={index} style={{ flex: '0 0 50%', textAlign: 'center' }}>
            {index + 1}. {opcion}
          </li>
        ))}
      </ul>
      <p>Lo que dijiste: {textoReconocido}</p>
      <button onClick={reconocimientoDeVoz}>
        {grabando ? 'Grabando...' : 'Grabar'}
      </button>
    </div>
  );
};
