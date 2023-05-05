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
  "predecir atraso de una aerolÍnea",
  "predecir tipo de hepatitis",
  "predecir cantidad de defunciones por covid",
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
  normal: "format: 100000-150000",
  premium: "format: 100-1000",
  volumen: "format: 100000-200000",
  año: "format: 2016,2017,2018",
  tipo: "format: convencional,orgánico",
  región:
    "format: Albany, Atlanta, Boston, California, Chicago, Denver, Orlando, Philadelphia'",
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
  mes: "format: 1-6",
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

const airOptions = {
  distancia: "format: 500, 800, 1100, 3000",
  día: "format: [1-7]",
  espera: "format: 620.5, 700.8, 900.0",
  salida: "format: 3.0, 5.7, 7.2",
  entrada: "format: 3.0, 5.7, 7.2",
  atraso: "format:  5.0, 11.8",
};

const airInitialState = {
  distancia: "",
  día: "",
  espera: "",
  salida: "",
  entrada: "",
  atraso: "",
};
const hepatitisOptions = {
  edad: "format: 10, 15, 55",
  alanina: "format: 4.5, 6.7, 8.5",
  colesterol: "format: 3.2, 4.7, 8.8",
  proteína: "format: 50, 70, 85",
  albúmina: "format: 30, 40.7. 70",
  aspartato: "format: 22.1, 30.6, 45.7",
};

const hepatitisInitialState = {
  edad: "",
  alanina: "",
  colesterol: "",
  proteína: "",
  albúmina: "",
  aspartato: "",
};

const covidOptions = {
  confirmados: "format: 10, 100, 1000",
  recuperados: "format: 10, 100, 1000",
};

const covidInitialState = {
  confirmados: "",
  recuperados: "",
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
  const [carros, setCarros] = useState(carInitialState);
  const [vino, setVino] = useState(wineInitialState);

  const [avocado, setAvocado] = useState(avocadoInitialState);
  const [sales, setSales] = useState(salesInitialState);
  const [fat, setFat] = useState(fatInitialState);
  const [churn, setChurn] = useState(churnInitialState);

  const [air, setAir] = useState(airInitialState);
  const [hepatitis, setHepatitis] = useState(hepatitisInitialState);
  const [covid, setCovid] = useState(covidInitialState);

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

      setAir(airInitialState);
      setHepatitis(hepatitisInitialState);
      setCovid(covidInitialState);
    } else if (
      selectedModel === "recomendar películas" &&
      Object.keys(movieOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      // seleccionar una pelicula con mas de una palabra despues de la key
      const key = Object.keys(movieOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );

      if (key) {
        const words = text
          .toLowerCase()
          .split(key)[1] // obtiene el texto después de la clave
          .trim() // elimina espacios en blanco al principio y al final
          .split(" "); // divide el texto en palabras

        const movieTitle = words
          .map((word) => {
            const commonWords = [
              "and",
              "of",
              "the",
              "a",
              "an",
              "in",
              "on",
              "at",
            ];
            if (commonWords.includes(word)) {
              return word;
            } else {
              return word.charAt(0).toUpperCase() + word.slice(1); // capitaliza la primera letra de la palabra
            }
          })
          .join(" ");

        // Busca el año en el título de la película
        const yearPattern = /\b(19|20)\d{2}\b/; // patrón para encontrar años
        const match = movieTitle.match(yearPattern);
        const year = match ? match[0] : null;

        let titleWithoutYear = movieTitle;
        if (year) {
          // Elimina el año del título de la película
          titleWithoutYear = movieTitle.replace(year, "").trim();
        }

        if (year) {
          setPeliculas({
            ...peliculas,
            [key]: `${titleWithoutYear} (${year})`,
          });
        }
      }
    } else if (
      selectedModel === "predecir precio de un automóvil" &&
      Object.keys(carOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(carOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setCarros({
          ...carros,
          [key]: word,
        });
      }
    } else if (
      selectedModel === "clasificar la calidad del vino" &&
      Object.keys(wineOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(wineOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setVino({
          ...vino,
          [key]: word,
        });
      }
    }
    ///////////////////////////////////////////////////////////////
    else if (
      selectedModel === "predecir si un cliente termina contrato" &&
      Object.keys(churnOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(churnOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setChurn({
          ...churn,
          [key]: [word],
        });
      }
    } else if (
      selectedModel === "predecir precio del aguacate" &&
      Object.keys(avocadoOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(avocadoOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      let word = getNextWordAfterKey(text.toLocaleLowerCase(), key);
      if (word) {
        if (word === "convencional") {
          word = "conventional";
        } else if (word === "orgánico") {
          word = "organic";
        }
        if (key === "región") {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        setAvocado({
          ...avocado,
          [key]: [word.replace(",", "").replace(".", "")],
        });
      }
    } else if (
      selectedModel === "predecir el porcentaje de grasa de un adulto" &&
      Object.keys(fatOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(fatOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setFat({
          ...fat,
          [key]: [word],
        });
      }
    } else if (
      selectedModel === "predecir ventas de walmart" &&
      Object.keys(salesOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(salesOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setSales({
          ...sales,
          [key]: [word],
        });
      }
    }

    ///////////////////////////////////////////////////////////////
    else if (
      selectedModel === "predecir atraso de una aerolínea" &&
      Object.keys(airOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(airOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setAir({
          ...air,
          [key]: [word.replace(",", "").replace(".", "")],
        });
      }
    } else if (
      selectedModel === "predecir tipo de hepatitis" &&
      Object.keys(hepatitisOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(hepatitisOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setHepatitis({
          ...hepatitis,
          [key]: [word],
        });
      }
    } else if (
      selectedModel === "predecir cantidad de defunciones por covid" &&
      Object.keys(covidOptions).some((option) =>
        text.toLocaleLowerCase().includes(option)
      )
    ) {
      const key = Object.keys(covidOptions).find((option) =>
        text.toLocaleLowerCase().includes(option)
      );
      const word = getNextWordAfterKey(text.toLocaleLowerCase(), key);

      if (word) {
        setCovid({
          ...covid,
          [key]: [word],
        });
      }
    }
  }, [text]);

  return (
    <>
      <FaceRecognition />

      <div
        style={{
          marginTop: "20px",
          position: "fixed",
          top: "5rem",
          left: "70rem",
          display: "flex",
          alignItems: "left",
          flexDirection: "column",
          height: "100%",
          width: "400px",
        }}
      >
        <span className="my-span">Opciones</span>

        {modelSelection &&
          models.map((model, index) => {
            return (
              <p
                key={index}
                style={{
                  marginTop: "4px",
                  marginBottom: "4px",
                  fontSize: "18px",
                }}
              >
                {index + 1}) {model.charAt(0).toUpperCase() + model.slice(1)}
              </p>
            );
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
        ) : !modelSelection &&
          selectedModel === "predecir atraso de una aerolínea" ? (
          <Model options={airOptions} state={air} model={selectedModel} />
        ) : !modelSelection &&
          selectedModel === "predecir tipo de hepatitis" ? (
          <Model
            options={hepatitisOptions}
            state={hepatitis}
            model={selectedModel}
          />
        ) : !modelSelection &&
          selectedModel === "predecir cantidad de defunciones por covid" ? (
          <Model options={covidOptions} state={covid} model={selectedModel} />
        ) : null}
      </div>

      <Speech onChildData={handleChildData} />
    </>
  );
};
