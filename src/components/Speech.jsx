
import React, {useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const Speech = (props) => {

  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleListen = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
    SpeechRecognition.startListening();
    
  }

  // pasar transcript a componente padre
  useEffect(() => {
    if (!listening && finalTranscript) {
      props.onChildData(transcript)
      console.log('se ejecuta toda la oracion')
    } 
  }, [listening, finalTranscript])


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p> 
      <button onClick={handleListen}>{listening ? 'stop' : 'start'}</button>
      <p>{transcript}</p>
    </div>
  );
}
