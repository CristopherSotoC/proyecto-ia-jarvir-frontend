import { useEffect, useState } from "react";

export const Churn = (props) => {
  const [indiceCliente, setIndiceCliente] = useState(0);
  const [centroBoton, setCentroBoton] = useState(0);
  const [textoReconocido, setTextoReconocido] = useState("");
  const [grabando, setGrabando] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [respuesta, setRespuesta] = useState({});

  const opciones = {
    gender: ["Femenino", "Masculino"],
    SeniorCitizen: ["No", "Sí"],
    Partner: ["No", "Sí"],
    Dependents: ["No", "Sí"],
    tenure: ["Desde 0 hasta 72 o más"],
    PhoneService: ["No", "Sí"],
    MultipleLines: ["No", "Sí"],
    InternetService: ["DSL", "Fibra Optica", "No"],
    OnlineSecurity: ["No", "Sí"],
    OnlineBackup: ["No", "Sí"],
    DeviceProtection: ["No", "Sí"],
    TechSupport: ["No", "Sí"],
    StreamingTV: ["No", "Sí"],
    StreamingMovies: ["No", "Sí"],
    Contract: ["Mes a mes", "Un año", "Dos años"],
    PaperlessBilling: ["No", "Sí"],
    PaymentMethod: [
      "Transferencia Bancaria",
      "Tarjeta de credito",
      "Cheque electrónico",
      "Cheque por correo",
    ],
    MonthlyCharges: ["Desde 18.25 hasta 118.75"],
    TotalCharges: ["Desde 18.8 hasta 8684.8"],
  };
  const [cliente, setcliente] = useState({
    gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",
    tenure: "",
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: "",
    TotalCharges: "",
  });
  const siguienteCliente = () => {
    setIndiceCliente(
      indiceCliente === Object.keys(cliente).length - 1 ? 0 : indiceCliente + 1
    );
  };
  const anteriorCliente = () => {
    setIndiceCliente(
      indiceCliente === 0 ? Object.keys(cliente).length - 1 : indiceCliente - 1
    );
  };

  const verificarCliente = () => {
    const valoresCliente = Object.values(cliente);
    if (!valoresCliente.includes("")) {
      const jsonCliente = {
        gender: cliente.gender,
        SeniorCitizen: cliente.SeniorCitizen,
        Partner: cliente.Partner,
        Dependents: cliente.Dependents,
        tenure: cliente.tenure,
        PhoneService: cliente.PhoneService,
        MultipleLines: cliente.MultipleLines,
        InternetService: cliente.InternetService,
        OnlineSecurity: cliente.OnlineSecurity,
        OnlineBackup: cliente.OnlineBackup,
        DeviceProtection: cliente.DeviceProtection,
        TechSupport: cliente.TechSupport,
        StreamingTV: cliente.StreamingTV,
        StreamingMovies: cliente.StreamingMovies,
        Contract: cliente.Contract,
        PaperlessBilling: cliente.PaperlessBilling,
        PaymentMethod: cliente.PaymentMethod,
        MonthlyCharges: cliente.MonthlyCharges,
        TotalCharges: cliente.TotalCharges,
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

    recognition.addEventListener("result", (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTextoReconocido(transcript);

      let number;
      if (!isNaN(transcript)) {
        number = Number(transcript);
      } else {
        const options = opciones[Object.keys(opciones)[indiceCliente]];
        const index = options.findIndex((option) =>
          option.toLowerCase().includes(transcript.toLowerCase())
        );
        if (index !== -1) {
          number = index;
        } else {
          // handle the case where the transcript is not a number or an option
        }
      }
      if (number !== undefined) {
        setcliente({
          ...cliente,
          [Object.keys(cliente)[indiceCliente]]: [number],
        });
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
    const saludo = `Has seleccionado la opción ${props.opcion}, para ello requiero que me brindes los siguientes datos`;
    leer(saludo);
    setCentroBoton(Math.floor(Object.keys(cliente).length / 2));
  }, []);

  useEffect(() => {
    verificarCliente();
  }, [cliente]);
  useEffect(() => {
    if (mounted && respuesta.churn) {
      leer(respuesta.churn);
    }
  }, [respuesta, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const listaOpciones = (i) => {
    return (
      <ul>
        {opciones[i].map((opcion) => (
          <li key={opcion} style={{ listStyleType: "none" }}>
            {opcion}
          </li>
        ))}
      </ul>
    );
  };

  const listaValores = Object.entries(cliente).map(([clave]) => (
    <li key={clave} style={{ listStyleType: "none" }}>
      {clave}
    </li>
  ));

  const listaValores2 = Object.entries(cliente).map(([clave, valor]) => (
    <li key={clave}>
      {clave}: {valor}
    </li>
  ));

  return (
    <div>
      <ul>{listaValores2}</ul>
      <button onClick={anteriorCliente}>Anterior</button>
      <button onClick={escuchar}>
        {grabando ? "Grabando..." : listaValores[indiceCliente]}
      </button>
      <button onClick={siguienteCliente}>Siguiente</button>
      <h5>Opciones disponibles: </h5>
      <>{listaOpciones(Object.keys(cliente)[indiceCliente])}</>
    </div>
  );
};
