import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// import "regenerator-runtime/runtime";

const VoiceRec = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition)
    return (
      <span>Seu navegador não é compativel com o Reconhecimento de fala!</span>
    );
  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>
        Começar a gravar
      </button>
      <button onClick={SpeechRecognition.stopListening}>Parar de gravar</button>
      <button onClick={resetTranscript}>Resetar campos</button>
      <h1>{transcript}</h1>
    </div>
  );
};

export default VoiceRec;
