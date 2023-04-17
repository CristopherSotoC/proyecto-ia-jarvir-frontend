import React, { useState, useEffect } from "react";
import { Churn } from "./modelscomponents/Churn";
import { Wine } from "./modelscomponents/Wine";
import { Car } from "./modelscomponents/Car";
import { Avocado } from "./modelscomponents/Avocado";
import { Fat } from "./modelscomponents/Fat";
import { Movie } from "./modelscomponents/Movie";

export const SpeechRecognition = () => {
  const [textoReconocido, setTextoReconocido] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  const opciones = [
    "Clasificar si un cliente se va a pasar de compañía",
    "Clasificar la calidad del vino",
    "Predecir precio de un automóvil",
    "Predecir precio del aguacate",
    "Predecir el porcentaje de grasa de un adulto",
    "Recomendar películas",
  ];

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
    saludar();
  }, []);

  useEffect(() => {
    console.log(opcionSeleccionada);
  }, [opcionSeleccionada]);

  if (opcionSeleccionada) {
    if (opcionSeleccionada.toLowerCase() === opciones[0].toLowerCase()) {
      return (
        <div>
          <Churn opcion={opciones[0]} />
        </div>
      );
    } else if (opcionSeleccionada.toLowerCase() === opciones[1].toLowerCase()) {
      return (
        <div>
          <Wine />
        </div>
      );
    } else if (opcionSeleccionada.toLowerCase() === opciones[2].toLowerCase()) {
      return (
        <div>
          <Car />
        </div>
      );
    } else if (opcionSeleccionada.toLowerCase() === opciones[3].toLowerCase()) {
      return (
        <div>
          <Avocado />
        </div>
      );
    } else if (opcionSeleccionada.toLowerCase() === opciones[4].toLowerCase()) {
      return (
        <div>
          <Fat/>
        </div>
      );
    } else if (opcionSeleccionada.toLowerCase() === opciones[5].toLowerCase()) {
      return (
        <div>
          <Movie/>
        </div>
      );
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
