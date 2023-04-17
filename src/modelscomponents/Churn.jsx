import { useEffect, useState } from "react";

export const Churn = (props) => {
  const [indiceCliente, setIndiceCliente] = useState(0);
  const [centroBoton, setCentroBoton] = useState(0);

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

  const mostrarCliente = (index) => {
    setIndiceCliente(index);
  };

  const [cliente, setcliente] = useState({
    gender: "Si",
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

  const saludar = () => {
    const saludo = new SpeechSynthesisUtterance();
    saludo.text = `Has seleccionado la opción ${props.opcion}, para ello requiero que me brindes los siguientes datos`;
    window.speechSynthesis.speak(saludo);
  };

  useEffect(() => {
    saludar();
    setCentroBoton(Math.floor(Object.keys(cliente).length / 2));
  }, []);

  const listaValores = Object.entries(cliente).map(([clave]) => (
    <li key={clave} style={{ listStyleType: "none" }}>
      {clave}
    </li>
  ));
  const listaValores2 = Object.entries(cliente).map(([clave, valor]) => (
    <li key={clave}>
      {clave}: {valor}
    </li>));

  return (
    <div>
      <ul>{listaValores2}</ul>
      <button onClick={anteriorCliente}>Anterior</button>
      <button>{listaValores[indiceCliente]}</button>
      <button onClick={siguienteCliente}>Siguiente</button>
    </div>
  );
};

