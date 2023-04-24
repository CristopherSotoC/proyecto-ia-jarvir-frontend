import React, { useState, useEffect } from "react";


export const SpeechRecognition = ({
  opciones,

  avocado,
  avocadoOpciones,
  setAvocado,


  
}) => {
  const [textoReconocido, setTextoReconocido] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const saludar = () => {
    const saludo = new SpeechSynthesisUtterance();
    saludo.text =
      "Hola, ¿en qué puedo ayudarte? Estas son las opciones disponibles:";
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

    recognition.addEventListener("result", (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTextoReconocido(transcript);
      const opcionEncontrada = opciones.find(
        (opcion) => opcion.toLowerCase() === transcript.toLowerCase()
      );
      if (opcionEncontrada) {
        setOpcionSeleccionada(opcionEncontrada);
        setTextoReconocido("");
      }
    });

    recognition.addEventListener("end", () => {
      setGrabando(false);
      recognition.stop();
    });

    setGrabando(true);
    recognition.start();
  };

  useEffect(() => {
    if (!opcionSeleccionada) {
      saludar();
    }
  }, [opcionSeleccionada]);


  
  if (opcionSeleccionada) {
    switch (opcionSeleccionada.toLowerCase()) {
      case opciones[0].toLowerCase():
        return (
          <div>
          </div>
        );
      case opciones[1].toLowerCase():
        return (
          <div>
          </div>
        );
      case opciones[2].toLowerCase():
        return (
          <div>
          </div>
        );
      case opciones[3].toLowerCase():
        return (
          <div>
            {/* <Avocado
              instruction={opciones[3]}
              data={avocado}
              opciones={avocadoOpciones}
              setData={setAvocado}
              setBack={setOpcionSeleccionada}
            /> */}
          </div>
        );
      case opciones[4].toLowerCase():
        return (
          <div>
          </div>
        );
      case opciones[5].toLowerCase():
        return (
          <div>
          </div>
        );
      default:
        return null;
    }
  } else {
    return (
      <div>
        <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none" }}>
          {opciones.map((opcion, index) => (
            <li key={index} style={{ flex: "0 0 50%", textAlign: "center" }}>
              {index + 1}. {opcion}
            </li>
          ))}
        </ul>
        <p>Lo que dijiste: {textoReconocido}</p>
        <button onClick={reconocimientoDeVoz}>
          {grabando ? "Grabando..." : "Grabar"}
        </button>
      </div>
    );
  }
};
