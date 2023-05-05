import React, { useEffect, useState } from "react";
import { Speech } from "./Speech";
import { Model } from "./Model";
import { FaceRecognition } from "./FaceRecognition";

const models = [
  "predecir si un cliente termina contrato",
  "clasificar la calidad del vino",
  "predecir precio de un automóvil",
  "predecir precio del aguacate",
  "predecir el porcentaje de grasa de un adulto",
  "recomendar películas",
  "predecir ventas de walmart",
];

const movieOptions = {
  título: "Any movie title with a year",
};

const movieInitialState = {
  título: "",
};

const carOptions = {
  año: "format: 2010, 2019, 2018",
  precio: "format: 2.3, 8.01, 5.5",
  km: "format: 20000, 15000, 5000",
  combustible: "format: petrol=0, diesel=1, cng=2",
  vendedor: "format: dealer=0, individual=1",
  transmisión: "format: manual=0, automatic=1",
  dueño: "format: 0, 1, 2, 3+",
};

const carInitialState = {
  año: "",
  precio: "",
  km: "",
  combustible: "",
  vendedor: "",
  transmisión: "",
  dueño: "",
};

const wineOptions = {
  acidez: "format: 0.66, 0.75",
  cloruros: "format: 0.02, 0.08",
  dióxido: "format: 20, 100",
  densidad: "format: 0.99, 1.00",
  alcohol: "format: 9.0, 14.0",
};

const wineInitialState = {
  acidez: "",
  cloruros: "",
  dióxido: "",
  densidad: "",
  alcohol: "",
};

const avocadoOptions = {
  medio: "format: 1000-2000",
  normal: "format: 100000-200000",
  premium: "format: 100-1000",
  volumen: "format:",
  año: "format: 2016,2017,2018",
  tipo: "format: convencional,orgánico",
  región:
    "format: Albany, Atlanta, Boston, California, Chicago, Denver, LosAngeles, Orlando, Philadelphia'",
};

const avocadoInitialState = {
  medio: "",
  normal: "",
  premium: "",
  volumen: "",
  año: "",
  tipo: "",
  región: "",
};

const salesOptions = {
  tienda: "format: 1, 100, 1000",
  departamento: "format: 1-99",
  mes: "format: 1-12",
  mitad: "format: 1, 2",
  feriado: "format: No=0, Si=1",
};

const salesInitialState = {
  tienda: "",
  departamento: "",
  mes: "",
  mitad: "",
  feriado: "",
};
const fatOptions = {
  pecho: "format: 10,50,90",
  abdomen: "format: 10,50,90",
  muslo: "format: 10,50,90",
  cadera: "format: 10,50,90",
  peso: "format: 10,50,90",
  cuello: "format: 10,50,90",
};

const fatInitialState = {
  pecho: "",
  abdomen: "",
  muslo: "",
  cadera: "",
  peso: "",
  cuello: "",
};

const churnOptions = {
  estabilidad: "format: 0-72",
  ciberseguridad: "format: No=0, Sí=1",
  contrato: "format: Month-to-month = 0, One year=1, Two year=2",
  factura: "format: No=0, Sí=1",
  mensualidad: "format: 0-120",
  totalidad: "format:0-10000",
};

const churnInitialState = {
  estabilidad: "",
  ciberseguridad: "",
  contrato: "",
  factura: "",
  mensualidad: "",
  totalidad: "",
};

const getNextWordAfterKey = (text, key) => {
  const words = text.split(" ");
  const index = words.indexOf(key);
  if (index !== -1 && index < words.length - 1) {
    return words[index + 1];
  } else {
    return null;
  }
};

export const MainPage = () => {
  const [text, setText] = useState("");

  const [modelSelection, setModelSelection] = useState(true);

  const [selectedModel, setSelectedModel] = useState("");

  const [peliculas, setPeliculas] = useState(movieInitialState);
  // const [movieTitle, setMovieTitle] = useState('')

  const [carros, setCarros] = useState(carInitialState);

  const [vino, setVino] = useState(wineInitialState);

  const [avocado, setAvocado] = useState(avocadoInitialState);
  const [sales, setSales] = useState(salesInitialState);
  const [fat, setFat] = useState(fatInitialState);
  const [churn, setChurn] = useState(churnInitialState);

  const [flag, setFlag] = useState(true);

  const handleChildData = (data) => {
    setText(data);
  };

  useEffect(() => {
    if (
      models.find(
        (model) => model.toLocaleLowerCase() === text.toLocaleLowerCase()
      ) &&
      !selectedModel
    ) {
      setSelectedModel(text.toLocaleLowerCase());
      setModelSelection(false);
    }
    if (text.toLocaleLowerCase() === "regresar" && selectedModel) {
      setSelectedModel("");
      setModelSelection(true);

      // reset states
      setPeliculas(movieInitialState);
      setCarros(carInitialState);
      setVino(wineInitialState);

      setAvocado(avocadoInitialState);
      setSales(salesInitialState);
      setFat(fatInitialState);
      setChurn(churnInitialState);
    }
    if (text.toLocaleLowerCase() === "enviar" && selectedModel) {
      setSendModel(true);
    }

    if (
      selectedModel === "recomendar películas" &&
      Object.keys(movieOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      // seleccionar una pelicula con mas de una palabra despues de la key
      const key = Object.keys(movieOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word1 = getNextWordAfterKey(text.toLocaleLowerCase(), key);
      const word2 = getNextWordAfterKey(text.toLocaleLowerCase(), word1);
      setPeliculas({
        ...peliculas,
        [key]: `${word1} (${word2})`,
      });
    }
    if (
      selectedModel === "predecir precio de un automóvil" &&
      Object.keys(carOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(carOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      setCarros({
        ...carros,
        [key]: word,
      });
    }
    if (
      selectedModel === "clasificar la calidad del vino" &&
      Object.keys(wineOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(wineOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      setVino({
        ...vino,
        [key]: word,
      });
    }
    ///////////////////////////////////////////////////////////////
    if (
      selectedModel === "predecir si un cliente termina contrato" &&
      Object.keys(churnOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(churnOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      setChurn({
        ...churn,
        [key]: [word],
      });
    }
    if (
      selectedModel === "predecir precio del aguacate" &&
      Object.keys(avocadoOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(avocadoOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      let word = getNextWordAfterKey(text.toLocaleLowerCase(), key).replace(
        ",",
        "."
      );

      if (word === "convencional") {
        word = "conventional";
      } else if (word === "orgánico") {
        word = "organic";
      }

      setAvocado({
        ...avocado,
        [key]: [word],
      });
    }
    if (
      selectedModel === "predecir el porcentaje de grasa de un adulto" &&
      Object.keys(fatOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(fatOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      setFat({
        ...fat,
        [key]: [word],
      });
    }
    if (
      selectedModel === "predecir ventas de walmart" &&
      Object.keys(salesOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(salesOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      setSales({
        ...sales,
        [key]: [word],
      });
    }
  }, [text]);

  return (
    <>
      <FaceRecognition />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span className="my-span">Opciones</span>

        {modelSelection &&
          models.map((model, index) => {
            return <p key={index}> - {model}</p>;
          })}

        {!modelSelection && selectedModel === "recomendar películas" ? (
          <Model
            options={movieOptions}
            state={peliculas}
            model={selectedModel}
          />
        ) : !modelSelection &&
          selectedModel === "predecir precio de un automóvil" ? (
          <Model options={carOptions} state={carros} model={selectedModel} />
        ) : !modelSelection &&
          selectedModel === "clasificar la calidad del vino" ? (
          <Model options={wineOptions} state={vino} model={selectedModel} />
        ) : !modelSelection &&
          selectedModel === "predecir si un cliente termina contrato" ? (
          <Model options={churnOptions} state={churn} model={selectedModel} />
        ) : !modelSelection &&
          selectedModel === "predecir precio del aguacate" ? (
          <Model
            options={avocadoOptions}
            state={avocado}
            model={selectedModel}
          />
        ) : !modelSelection &&
          selectedModel === "predecir el porcentaje de grasa de un adulto" ? (
          <Model options={fatOptions} state={fat} model={selectedModel} />
        ) : !modelSelection &&
          selectedModel === "predecir ventas de walmart" ? (
          <Model options={salesOptions} state={sales} model={selectedModel} />
        ) : null}

        <Speech onChildData={handleChildData} />
      </div>
    </>
  );
};
