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

      // cambiar data para que sea un objeto con las propiedades que necesita la petición
      const modelOptions = OptionsForFetch.find((options) =>
        options.hasOwnProperty(model)
      );
      if (modelOptions) {
        Object.keys(data).forEach((key, index) => {
          if (modelOptions[model][key]) {
            const newKey = modelOptions[model][key];
            if (newKey !== key) {
              data[newKey] = data[key];
              delete data[key];
            } else {
              const currentValue = data[key];
              delete data[key];
              data[key] = currentValue;
            }
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
    <>
      <div>
        {propNames.map((propName, i) => (
          <p key={propName} style={{marginBottom: "1px",marginTop: "1px"}}>
            {i + 1}) {propName.charAt(0).toUpperCase() + propName.slice(1)}:{" "}
            {options[propName]}
          </p>
        ))}

        <div style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "left",
          flexDirection: "column",
          height: "450px",
          width: "400px",
        }}>
          <span className="my-span">Datos</span>

          {Object.keys(state).map((key) => (
            <li key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {state[key]}
            </li>
          ))}
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(50, 40, 40, 0.1)",
          position: "fixed",
          top: "33rem",
          left: "13rem",
          transform: "translate(-50%, -50%)",
          height: "100px",
          width: "400px",
          display: "flex",
          justifyContent: "top",
          borderRadius: "5px",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <span
          style={{ fontWeight: "bold", fontSize: "24px", marginLeft: "10px" }}
        >
          {"Respuesta:"}
        </span>
        {console.log(resp)}
        <p
          style={{
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          {resp.resp ? resp.resp : " "}
        </p>
      </div>
    </>
  );
};
