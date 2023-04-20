import { useEffect, useState } from "react";

export const Avocado = ({ instruction, data, setData, opciones, setBack }) => {
  const [grabando, setGrabando] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [respuesta, setRespuesta] = useState({});
  const [respuestaLeida, setRespuestaLeida] = useState(false);

  const verificarData = () => {
    const valoresCliente = Object.values(data);
    let Tipo;
    if (data["Tipo"] == "Convencional") {
      Tipo = "conventional";
    } else if (data["Tipo"] == "Orgánico") {
      Tipo = "organic";
    }

    if (!valoresCliente.includes("")) {
      const jsonCliente = {
        "Total Volume":    [data["Volumen Total"                     ]*100],
        4046:               data["Aguacate 1"                        ],
        4225:              [data["Aguacate 2"                        ]*100], 
        4770:               data["Aguacate 3"                        ],
        year:               data["Año"                               ],
        type:              [Tipo],                                      
        region:             data["Región"                            ],
       };
      console.log(JSON.stringify(jsonCliente));

      fetch("http://127.0.0.1:5000/model/avocado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonCliente),
      })
        .then((response) => response.json())
        .then((data) => {
          setRespuesta(data);
          setRespuestaLeida(false); // Resetea la variable respuestaLeida
          leer(data.price);
          setRespuestaLeida(true); // Activa la variable respuestaLeida
        });
    }
  };

  const leer = (texto) => {
    const saludo = new SpeechSynthesisUtterance();
    saludo.text = texto;
    window.speechSynthesis.speak(saludo);
  };

  const escuchar = () => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    // Agregar variables para almacenar la última key y la última opción válida reconocida
    let lastKey = null;
    let lastOption = null;
    let number;

    recognition.addEventListener("result", (event) => {
      const isFinal = event.results[event.results.length - 1].isFinal;
      if (!isFinal) {
        // Si no es el resultado final, no hacemos las validaciones aún
        return;
      }
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
        .toLowerCase();

      if (transcript == "regresar a las opciones") {
        setBack(null);
      }
      // Comprobar si el usuario ha dicho una key
      Object.keys(data).forEach((key) => {
        if (transcript.includes(key.toLowerCase())) {
          lastKey = key;
        }
      });
      // Comprobar si el usuario ha dicho una opción válida después de la última key reconocida
      if (lastKey !== null) {
        // Comprobar si el usuario ha dicho una key, con que requiere valor numerico
        if (
          [
            "Volumen Total",
            "Aguacate 1",
            "Aguacate 2",
            "Aguacate 3",
            "Año",
          ].includes(lastKey)
        ) {
          lastOption = transcript.replace(lastKey.toLowerCase(), "").trim();
          number = Number(lastOption);
          // Verificar si se ha especificado una opción válida
          if (isNaN(number)) {
            number = undefined;
          }
        } else {
          const index = opciones[lastKey].findIndex((option) =>
            transcript.includes(option.toLowerCase())
          );
          console.log(index);
          if (index !== -1) {
            lastOption = opciones[lastKey][index];
            number = lastOption;
          } else {
            number = undefined;
          }
        }
      }
      if (lastKey !== null && number !== undefined) {
        setData({
          ...data,
          [lastKey]: [number],
        });

        console.log(lastKey);
        console.log(lastOption);
        // Reiniciar las variables lastKey y lastOption después de guardar la opción válida
        lastKey = null;
        lastOption = null;
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
    const saludo = `Has seleccionado la opción ${instruction}, para ello requiero que me brindes los siguientes datos`;
    leer(saludo);
  }, []);

  useEffect(() => {
    verificarData();
  }, [data]);

  useEffect(() => {
    console.log(respuesta);
  }, [respuesta]);

  useEffect(() => {
    if (respuesta && !respuestaLeida && mounted) {
      setRespuestaLeida(true); // Activa la variable respuestaLeida
      leer(respuesta.price);
    }
  }, [respuesta, respuestaLeida]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const listaValores = Object.entries(data).map(([clave, valor]) => {
    // Encuentra los valores correspondientes de `opciones` según la clave de `cliente`
    const opcionesValores = opciones[clave];

    // Verifica si se encontraron los valores correspondientes en `opciones`
    if (opcionesValores) {
      // Devuelve una lista que contiene el nombre de la propiedad y los valores correspondientes
      return (
        <div
          key={clave}
          style={{
            height: clave === "Región" ? "50px" : "20px",
            width: "1000px",
            marginTop: "2px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <div style={{ width: "400px" }}>
              {clave}: {valor}
            </div>
            <div style={{ width: "600px", display: "flex" }}>
              [{opcionesValores.join(", ")}]
            </div>
          </div>
        </div>
      );
    } else {
      // Si no se encontraron valores correspondientes en `opciones`, solo devuelve el nombre de la propiedad y su valor
      return (
        <div key={clave}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "left",
            }}
          >
            <div style={{ textAlign: "left" }}>
              {clave}: {valor}
            </div>
            <div style={{ textAlign: "left" }}>
              [{opcionesValores.join(", ")}]
            </div>
          </div>
        </div>
      );
    }
  });

  return (
    <div style={{ textAlign: "center" }}>
      {listaValores}
      <div style={{ marginTop: "20px" }}>
        <button onClick={escuchar}>
          {grabando ? "Grabando..." : "Grabar"}
        </button>
      </div>
    </div>
  );
};
