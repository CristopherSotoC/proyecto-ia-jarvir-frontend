import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { MainPage } from "./MainPage";
import backgroundImage from "../images/Sunday.jpg";

export const Authentication = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [authResponse, setAuthResponse] = useState(null);
  const [showCamera, setShowCamera] = useState(true);

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Image = imageSrc.split(",")[1]; // Obtener solo los datos de la imagen (sin el encabezado base64)
    const imageBlob = b64toBlob(base64Image, "image/jpeg"); // Convertir a objeto Blob

    // Crear objeto de tipo File a partir del Blob
    const imageFile = new File([imageBlob], "capturedImage.jpg", {
      type: "image/jpeg",
    });

    setCapturedImage(imageFile);
  }, []);

  useEffect(() => {
    const sendImageToBackend = async () => {
      if (capturedImage) {
        try {
          const formData = new FormData();
          formData.append("image", capturedImage);

          const response = await axios.post(
            "http://127.0.0.1:5000/model/auth",
            formData
          );

          setAuthResponse(response.data.resp);
        } catch (error) {
          // Manejar el error en caso de fallo en la comunicación con el backend
          console.error(error);
        }
      }
    };

    sendImageToBackend();
  }, [capturedImage]);

  const closeCamera = () => {
    setCapturedImage(null);
    setAuthResponse(null);
    setShowCamera(true); // Set showCamera to true when the camera is closed
  };

  // Función auxiliar para convertir base64 a Blob
  const b64toBlob = (base64, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {authResponse === "Eres tú" ? (
        <div>
          <MainPage />
        </div>
      ) : (
        <div>
          {capturedImage ? (
            <div>
              {authResponse === "No eres tú" ? (
                <p>Acceso denegado. Inténtalo de nuevo.</p>
              ) : (
                <p>Procesando autenticación...</p>
              )}
              <button onClick={closeCamera}>Reintentar</button>
            </div>
          ) : (
            <div>
              {showCamera && (
                <>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                  />
                  <button
                    style={{
                      position: "fixed",
                      top: 480,
                      left: 230,
                    }}
                    onClick={captureImage}
                  >
                    Capturar imagen
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
