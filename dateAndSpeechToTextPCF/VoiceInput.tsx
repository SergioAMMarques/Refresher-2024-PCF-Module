import * as React from 'react';
import { TextField } from '@fluentui/react';
import { useState } from 'react';
import useSpeechToText from './Hook/useSpeechToText';

export const VoiceInput: React.FC = () => {

  const [textInput, setTextInput] = useState("");

  const { isListening, transcript, startListening, stopListening } = useSpeechToText();

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening();
  }

  const stopVoiceInput = () => {
    setTextInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : ''));
    stopListening();
  }

  return (
    <>
      <button
        onClick={startStopListening}
        style={{
          backgroundColor: isListening ? "red" : "green",
          color: "white",
          cursor: "pointer",
        }}
      >
        {isListening ? 'Stop Recording' : 'Start Recording'}
      </button>
      <TextField
        label="Speech to Text"
        disabled={isListening}
        value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
        onChange={(e) => { setTextInput((e.target as HTMLInputElement).value) }}
      />
    </>
  )
}
