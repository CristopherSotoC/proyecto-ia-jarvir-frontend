import { useEffect, useState } from "react";

export const Churn = (props) => {

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

  const saludar = () => {
    const saludo = new SpeechSynthesisUtterance();
    saludo.text = `Has seleccionado la opción ${props.opcion}, para ello requiero que me brindes los siguientes datos`;
    window.speechSynthesis.speak(saludo);
  };

  useEffect(() => {
    saludar()
  }, []);

  return (
  <>Churn</>
  );
};

