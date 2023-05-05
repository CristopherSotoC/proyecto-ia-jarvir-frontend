import React, { useEffect, useState } from "react";
import { Speech } from "./Speech";

const modelsFetch = {
  "recomendar películas": "movie",
  "predecir precio de un automóvil": "car",
  "clasificar la calidad del vino": "wine",

  "predecir si un cliente termina contrato": "churn",
  "predecir precio del aguacate": "avocado",
  "predecir el porcentaje de grasa de un adulto": "fat",
  "predecir ventas de walmart": "sales",
};

const OptionsForFetch = [
  {
    "recomendar películas": {
      título: "movie_title",
    },
    "predecir precio de un automóvil": {
      año: "Year",
      precio: "Present_Price",
      km: "Kms_Driven",
      combustible: "Fuel_Type",
      vendedor: "Seller_Type",
      transmisión: "Transmission",
      dueño: "Owner",
    },
    "clasificar la calidad del vino": {
      acidez: "volatile acidity",
      cloruros: "chlorides",
      dióxido: "free sulfur dioxide",
      densidad: "density",
      alcohol: "alcohol",
    },
    "predecir si un cliente termina contrato": {
      estabilidad: "tenure",
      ciberseguridad: "OnlineSecurity",
      contrato: "Contract",
      factura: "PaperlessBilling",
      mensualidad: "MonthlyCharges",
      totalidad: "TotalCharges",
    },
    "predecir precio del aguacate": {
      medio: "4046",
      normal: "4225",
      premium: "4770",
      volumen: "Total Volume",
      año: "year",
      tipo: "type",
      región: "region",
    },
    "predecir el porcentaje de grasa de un adulto": {
      pecho: "Chest",
      abdomen: "Abdomen",
      muslo: "Thigh",
      cadera: "Hip",
      peso: "Weight",
      cuello: "Neck",
    },
    "predecir ventas de walmart": {
      tienda: "Store",
      departamento: "Dept",
      mes: "Month",
      mitad: "Semester",
      feriado: "IsHoliday",
    },
  },
];

export const Model = ({ options, state, model }) => {
  const [resp, setResp] = useState("");

  const propNames = Object.keys(options);

  // todo: cuando se llena el state hacer la peticion
  useEffect(() => {
    const valoresVacios = Object.values(state).filter((valor) => valor === "");
    if (valoresVacios.length === 0) {
      // verificar valores numericos en string y convertirlos a numeros float o int
      const newArray = Object.entries(state).map(([clave, valor]) => {
        if (typeof valor === "string" && !isNaN(parseFloat(valor))) {
          return [clave, parseFloat(valor)];
        }
        if (typeof valor === "string" && !isNaN(parseInt(valor))) {
          return [clave, parseInt(valor)];
        }
        return [clave, valor];
      });
      const data = Object.fromEntries(newArray);

      // cambiar data para que sea un objeto con las propiedades que necesita la peticion
      const modelOptions = OptionsForFetch.find((options) =>
        options.hasOwnProperty(model)
      );
      if (modelOptions) {
        Object.keys(data).forEach((key) => {
          if (modelOptions[model][key]) {
            data[modelOptions[model][key]] = data[key];
            delete data[key];
          }
        });
      }
      console.log(data);
      console.log(JSON.stringify(data));

      // direccion peticion
      const dir = modelsFetch[model];
      console.log(dir);
      async function fetchData() {
        const response = await fetch(`http://127.0.0.1:5000/model/${dir}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const json = await response.json();
        setResp(json);
      }
      fetchData();
    }
  }, [state]);

  return (
    <div>
      {propNames.map((propName) => (
        <p key={propName}>
          {propName}: {options[propName]}
        </p>
      ))}
      {Object.keys(state).map((key) => (
        <li key={key}>
          {key}: {state[key]}
        </li>
      ))}
      {console.log(resp)}
    </div>
  );
};
