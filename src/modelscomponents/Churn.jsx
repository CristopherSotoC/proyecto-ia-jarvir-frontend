import { useEffect, useState } from "react";

export const Churn = ({
  opcion,
  churnCliente,
  setchurnCliente,
  churnOpciones,
}) => {
  const [grabando, setGrabando] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [respuesta, setRespuesta] = useState({});

  const verificarCliente = () => {
    const valoresCliente = Object.values(churnCliente);
    if (!valoresCliente.includes("")) {
      const jsonCliente = {
        gender:            [churnOpciones["Género"                     ].indexOf(churnCliente["Género"                     ])],
        SeniorCitizen:     [churnOpciones["Adulto Mayor"               ].indexOf(churnCliente["Adulto Mayor"               ])],
        Partner:           [churnOpciones["Pareja"                     ].indexOf(churnCliente["Pareja"                     ])],
        Dependents:        [churnOpciones["Dependiente"                ].indexOf(churnCliente["Dependiente"                ])],
        tenure:            [churnOpciones["Afiliación"                 ].indexOf(churnCliente["Afiliación"                 ])],
        PhoneService:      [churnOpciones["Servicio Móvil"             ].indexOf(churnCliente["Servicio Móvil"             ])],
        MultipleLines:     [churnOpciones["Líneas Múltiples"           ].indexOf(churnCliente["Líneas Múltiples"           ])],
        InternetService:   [churnOpciones["Servicio Internet"          ].indexOf(churnCliente["Servicio Internet"          ])],
        OnlineSecurity:    [churnOpciones["Seguridad Online"           ].indexOf(churnCliente["Seguridad Online"           ])],
        OnlineBackup:      [churnOpciones["Seguridad en Línea"         ].indexOf(churnCliente["Seguridad en Línea"         ])],
        DeviceProtection:  [churnOpciones["Protección de Dispositivos" ].indexOf(churnCliente["Protección de Dispositivos" ])],
        TechSupport:       [churnOpciones["Soporte Técnico"            ].indexOf(churnCliente["Soporte Técnico"            ])],
        StreamingTV:       [churnOpciones["Televisión en Streaming"    ].indexOf(churnCliente["Televisión en Streaming"    ])],
        StreamingMovies:   [churnOpciones["Películas en Streaming"     ].indexOf(churnCliente["Películas en Streaming"     ])],
        Contract:          [churnOpciones["Tipo de Contrato"           ].indexOf(churnCliente["Tipo de Contrato"           ])],
        PaperlessBilling:  [churnOpciones["Facturación Electrónica"    ].indexOf(churnCliente["Facturación Electrónica"    ])],
        PaymentMethod:     [churnOpciones["Método de Pago"             ].indexOf(churnCliente["Método de Pago"             ])],
        MonthlyCharges:    [churnOpciones["Cargos Mensuales"           ].indexOf(churnCliente["Cargos Mensuales"           ])],
        TotalCharges:      [churnOpciones["Cargos Totales"             ].indexOf(churnCliente["Cargos Totales"             ])],
      };

      fetch("http://127.0.0.1:5000/model/churn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonCliente),
      })
        .then((response) => response.json())
        .then((data) => setRespuesta(data));
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
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      console.log(transcript);
      // Comprobar si el usuario ha dicho una key
      Object.keys(churnCliente).forEach((key) => {
        if (transcript.includes(key.toLowerCase())) {
          lastKey = key;
        }
      });
      // Comprobar si el usuario ha dicho una opción válida después de la última key reconocida
      if (lastKey !== null) {
        if (["Cargos Mensuales", "Cargos Totales", "Afiliación"].includes(lastKey)) {
          lastOption = transcript.replace(lastKey.toLowerCase(), "").trim();
          number = Number(lastOption);
        } else {
          const index = churnOpciones[lastKey].findIndex((option) =>
            transcript.includes(option.toLowerCase())
          );
          console.log(index);
          if (index !== -1) {
            lastOption = churnOpciones[lastKey][index];
            number = lastOption;
          }
        }
      }
      if (number !== undefined) {
        setchurnCliente({
          ...churnCliente,
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
    const saludo = `Has seleccionado la opción ${opcion}, para ello requiero que me brindes los siguientes datos`;
    leer(saludo);
  }, []);

  useEffect(() => {
    verificarCliente();
  }, [churnCliente]);

  useEffect(() => {
    if (mounted && respuesta.churn) {
      leer(respuesta.churn);
    }
  }, [respuesta, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const listaValores = Object.entries(churnCliente).map(([clave, valor]) => {
    // Encuentra los valores correspondientes de `opciones` según la clave de `cliente`
    const opcionesValores = churnOpciones[clave];

    // Verifica si se encontraron los valores correspondientes en `opciones`
    if (opcionesValores) {
      // Devuelve una lista que contiene el nombre de la propiedad y los valores correspondientes
      return (
        <div key={clave} style={{ height: "20px", width: "1000px" }}>
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
            <div style={{ width: "600px" }}>[{opcionesValores.join(", ")}]</div>
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
