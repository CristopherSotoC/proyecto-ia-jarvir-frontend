import React, { useState } from "react";
import { SpeechRecognition } from "./SpeechRecognition";

export const Start = () => {
  const [mostrarSpeechRecognition, setMostrarSpeechRecognition] =
    useState(false);
  const [botonVisible, setBotonVisible] = useState(true);

  const modelos = [
    "Predecir si un cliente termina contrato",
    "Clasificar la calidad del vino",
    "Predecir precio de un automóvil",
    "Predecir precio del aguacate",
    "Predecir el porcentaje de grasa de un adulto",
    "Recomendar películas",
  ];
  const churnOpciones = {
    "Género":                        ["Femenino", "Masculino"],
    "Adulto Mayor":                  ["No", "Sí"],
    "Pareja":                        ["No", "Sí"],
    "Dependiente":                   ["No", "Sí"],
    "Afiliación":                    ["Desde 0 hasta 72 o más"],
    "Servicio Móvil":                ["No", "Sí"],
    "Líneas Múltiples":              ["No", "Sí"],
    "Servicio Internet":             ["DSL", "Fibra Optica", "No"],
    "Seguridad Online":              ["No", "Sí"],
    "Seguridad en Línea":            ["No", "Sí"],
    "Protección de Dispositivos":    ["No", "Sí"],
    "Soporte Técnico":               ["No", "Sí"],
    "Televisión en Streaming":       ["No", "Sí"],
    "Películas en Streaming":        ["No", "Sí"],
    "Tipo de Contrato":              ["Mes a mes", "Un año", "Dos años"],
    "Facturación Electrónica":       ["No", "Sí"],
    "Método de Pago":                ["Transferencia Bancaria","Tarjeta de credito","Cheque electrónico","Cheque por correo"],
    "Cargos Mensuales":              ["Desde 18.25 hasta 118.75"],
    "Cargos Totales":                ["Desde 18.8 hasta 8684.8"],
  };
  const [churnCliente, setchurnCliente] = useState({
    "Género":                       "",
    "Adulto Mayor":                 "",
    "Pareja":                       "",
    "Dependiente":                  "",
    "Afiliación":                   "",
    "Servicio Móvil":               "",
    "Líneas Múltiples":             "",
    "Servicio Internet":            "",
    "Seguridad Online":             "",
    "Seguridad en Línea":           "",
    "Protección de Dispositivos":   "",
    "Soporte Técnico":              "",
    "Televisión en Streaming":      "",
    "Películas en Streaming":       "",
    "Tipo de Contrato":             "",
    "Facturación Electrónica":      "",
    "Método de Pago":               "",
    "Cargos Mensuales":             "",
    "Cargos Totales":               "",
  });

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

  const fatOpciones = {     
    "Pecho":                         ["Desde 79 hasta 136 o más"], 
    "Abdomen":                       ["Desde 69 hasta 148 o más"], 
    "Muslo":                         ["Desde 400 hasta 1400 o más"], 
    "Cadera":                        ["Desde 400 hasta 1400 o más"],
    "Peso":                          ["Desde 400 hasta 1400 o más"], 
    "Cuello":                        ["Desde 400 hasta 1400 o más"],  
  };                    

  const [fat, setFat] = useState({
    "Pecho":                         "", 
    "Abdomen":                       "", 
    "Muslo":                         "", 
    "Cadera":                        "",
    "Peso":                          "", 
    "Cuello":                        "",  
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

          churnCliente={churnCliente} 
          setchurnCliente={setchurnCliente} 
          churnOpciones={churnOpciones} 
          
          avocado={avocado} 
          avocadoOpciones={avocadoOpciones}
          setAvocado={setAvocado}

          fat={fat}
          fatOpciones={fatOpciones}
          setFat={setFat}

      />
      }

    </div>
  );
};
