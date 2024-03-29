import React, { useEffect, useState } from "react";

function Counter({
  text,
  cursorPosition
}) {

  const [lineCount, setLineCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
    
  const countLinesAndWords = (text) => {
    if (text) {
      // Si 'text' tiene un valor
      const lines = text.split("\n");
      const lineCount = lines.length;
  
      const words = text.split(/\s+/);
      const wordCount = words.filter((word) => word !== "").length;
  
      setLineCount(lineCount);
      setWordCount(wordCount);
    } else {
      // Si 'text' es null o undefined, establece los recuentos en 0
      setLineCount(0);
      setWordCount(0);
    }
  };
  

  useEffect(() => {
    // Este efecto se ejecutará cada vez que lineCount, wordCount o cursorPosition cambien
    // Puedes realizar acciones aquí cuando cambian las propiedades
    // Por ejemplo, puedes mostrar un mensaje en la consola o ejecutar alguna lógica adicional
    countLinesAndWords(text);
  }, [text,cursorPosition.line,cursorPosition.column]);

  return (
    <div className="line-word-count bg-green-500 text-white text-center place-items-center my-auto">
      <div className="line-count">Lines: {lineCount}</div>
      <div className="word-count">Words: {wordCount}</div>
      <div className="cursor-pointer">
        Cursor Pointer: ({cursorPosition.line},{cursorPosition.column})
      </div>
    </div>
  );
}

export default Counter;
