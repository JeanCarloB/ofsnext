import React from "react";

export function TextAreaComponents({textareaRef,inputText,outputText,resultText,handleOnChange,handleKeyDown,handleKeyUp}) {
  return (
    <>
      <textarea
        id="EA"
        className="outline outline-blue-500 h-40 p-2 resize-none font-mono"
        value={inputText}
        ref={textareaRef}
        onChange={handleOnChange}
        placeholder="EA"
        onKeyUp={handleKeyUp} // Agrega el manejador de eventos onKeyUp
        autoFocus
      />
      <textarea
        id="TA"
        className="outline outline-blue-500 h-40 p-2 resize-none"
        value={outputText}
        placeholder="TA"
        readOnly
      />
      <textarea
        id="RA"
        className="outline outline-blue-500 h-40 p-2 resize-none"
        value={resultText}
        placeholder="RA"
        readOnly
      />
    </>
  );
}
