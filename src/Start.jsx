import React, { useState } from "react";
import { SpeechRecognition } from "./SpeechRecognition";

export const Start = () => {
  const [mostrarSpeechRecognition, setMostrarSpeechRecognition] =
    useState(false);
  const [botonVisible, setBotonVisible] = useState(true);

  const modelos = [
    "una",
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
      />
      }

    </div>
  );
};
