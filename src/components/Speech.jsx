import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const Speech = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleListen = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
    SpeechRecognition.startListening();
  };

  // pasar transcript a componente padre
  useEffect(() => {
    if (!listening && finalTranscript) {
      props.onChildData(transcript);
      console.log("se ejecuta toda la oracion");
    }
  }, [listening, finalTranscript]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <button className="round-button" onClick={handleListen}>
          {listening ? "recording" : "start"}
        </button>
      </div>
      <div
        style={{
          backgroundColor: "rgba(50, 40, 40, 0.1)",
          position: "fixed",
          top: "27rem",
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
          {"Speech:"}
        </span>
        <p
          style={{
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          {transcript ? transcript : " "}
        </p>
      </div>
    </div>
  );
};
