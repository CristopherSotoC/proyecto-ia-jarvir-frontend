import React, { useState } from "react";
import { SpeechRecognition } from "./SpeechRecognition";

export const Start = () => {
  const [mostrarSpeechRecognition, setMostrarSpeechRecognition] = useState(false);
  const [botonVisible, setBotonVisible] = useState(true);

  const modelos = [
    "Predecir si un cliente termina contrato",
    "Clasificar la calidad del vino",
    "Predecir precio de un automóvil",
    "Predecir precio del aguacate",
    "Predecir el porcentaje de grasa de un adulto",
    "Recomendar películas",
  ];

  const avocadoOpciones = {
    "Volumen Total":                ["Desde 400 hasta 1400 o más"],       // 40 000 - 140 000
    "Aguacate 1":                   ["Desde 500 hasta 2000 o más"],        
    "Aguacate 2":                   ["Desde 400 hasta 1300 o más"],       // 40 000-130 000
    "Aguacate 3":                   ["Desde 40 hasta 200 o más"],     
    "Año":                          ["Desde 2015 hasta 2018 "],         
    "Tipo":                         ["Convencional","Orgánico"],        
    "Región":                       ["Albany","Atlanta","Boston","California","Chicago","Columbus","Denver","Orlando","Philadelphia","Detroit",
                                      "Houston","Las Vegas","Los Angeles","Louisville","San Francisco","New York"],
  };                    

  const [avocado, setAvocado] = useState({
    "Volumen Total":                 "", 
    "Aguacate 1":                    "", 
    "Aguacate 2":                    "", 
    "Aguacate 3":                    "",
    "Año":                           "", 
    "Tipo":                          "",  
    "Región":                        "",
  });

  const handleClick = () => {
    setBotonVisible(false);
    setMostrarSpeechRecognition(true);
  };

  return (
    <div>
      {botonVisible && <button onClick={handleClick}>Iniciar</button>}
      {mostrarSpeechRecognition && 
      <SpeechRecognition 
          opciones={modelos} 

          avocado={avocado} 
          avocadoOpciones={avocadoOpciones}
          setAvocado={setAvocado}
      />
      }

    </div>
  );
};
