import React from "react";

export function TextAreaComponents({textareaRef,inputText,outputText,resultText,handleOnChange,handleKeyUp}) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-3 justify-around m-5">
      <textarea
        id="EA"
        className="outline outline-green-500 h-40 p-2 resize-none font-mono"
        value={inputText}
        ref={textareaRef}
        onChange={handleOnChange}
        placeholder="EA"
        onKeyUp={handleKeyUp} // Agrega el manejador de eventos onKeyUp
        autoFocus
      />
      <textarea
        id="TA"
        className="outline outline-green-500 h-40 p-2 resize-none"
        value={outputText}
        placeholder="TA"
        readOnly
      />
      <textarea
        id="RA"
        className="outline outline-green-500 h-40 p-2 resize-none col-span-2"
        value={resultText}
        placeholder="RA"
        readOnly
      />
    </div>
  );
}
