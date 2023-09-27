"use client";
import { useState } from "react";
import { useKeywords } from "@/app/context/KeywordsContext";
import { useScripts } from "@/app/context/ScriptsContext";
import Modal from "@/components/Modal";
import ModalLoad from "@/components/ModalLoad";
import Alert from "./Alert";

const TextEditor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [suggestedWords, setSuggestedWords] = useState([]);
  const [selectedWordIndex, setSelectedWordIndex] = useState(-1);
  const [lineCount, setLineCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [isLoaded, setLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [script, setScript] = useState();
  const [isCompile, setIsCompile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keywords = useKeywords();
  const scripts = useScripts();

  const handleKeyUp = ({target:{value}}) => {
    // Obtén el texto actual del textarea
    const text = value;

    // Divide el texto en palabras
    const words = text.split(/\s+/);

    // Obtén la palabra actual que el usuario está escribiendo
    const currentWord = words[words.length - 1];

    // Filtra las palabras sugeridas basadas en la palabra actual
    const filteredWords = keywords.filter((keyword) =>
      keyword.startsWith(currentWord)
    );

    // Actualiza el estado de las palabras sugeridas
    setSuggestedWords(filteredWords);
  };

  const handleClear = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the text?"
    );
    if (confirmed) {
      setInputText("");
      setOutputText("");
      setResultText("");
      setError("");
      setCursorPosition({ line: 1, column: 1 });
      setLineCount(0);
      setWordCount(0);
      setIsCompile(false);
      setScript();
    }
  };

  const openModal = () => {
    inputText && inputText.trim() !== ""
      ? setIsModalOpen(true)
      : setIsModalOpen(false);
  };

  const openLoaded = () => {
    setLoaded(true);
  };

  const countLinesAndWords = (text) => {
    // Contar líneas
    const lines = text.split("\n");
    const lineCount = lines.length;

    // Contar palabras
    const words = text.split(/\s+/);
    const wordCount = words.filter((word) => word !== "").length;

    setLineCount(lineCount);
    setWordCount(wordCount);
  };

  const handleKeyDown = (event) => {
    // Obtenemos el contenido actual del textarea
    const text = event.target.value;

    // Obtenemos la posición del cursor
    const selectionStart = event.target.selectionStart;

    // Contamos las líneas y columnas
    const lines = text.substr(0, selectionStart).split("\n");
    const currentLine = lines.length;
    const currentColumn = lines[currentLine - 1].length + 1;

    // Actualizamos el estado con la posición del cursor
    setCursorPosition({ line: currentLine, column: currentColumn });
  };

  const handleScript = async () => {
    try {
      const response = await fetch(`/api/script/${inputText}`, {
        method: "GET",
      });
      const data = await response.json();
      setInputText(data.message);
    } catch (err) {
      setInputText("");
    }
  };

  const handleCompile = async () => {
    try {
      setIsCompile(true);
      const response = await fetch("/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await response.json();
      !inputText || inputText.trim <= 0
        ? setError("The EA field is empty")
        : (setOutputText(data.result), setError(""));
    } catch (err) {
      console.log(err);
      setInputText(``);
    }
  };

  const handleEval = async () => {
    try {
      const response = await fetch("/api/eval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: script.id }),
      });
      const data = await response.json();

      if (data && data.result && scripts.find(e=>e.script===inputText)) {
        // Si 'data' y 'data.result' están definidos y no son nulos o indefinidos,
        // entonces tenemos información válida en 'data'
        setResultText(data.result);
        setError("");
      }else{
        setResultText("");
        setError("Not result finded");
      }
    } catch (err) {
      setResultText("");
      setError("TA is empty");
    }
  };

  const handleOnChange = ({ target: { value } }) => {
    if (load && inputText.trim() === "") setLoad(false);
    setInputText(value);
    countLinesAndWords(value); // Actualiza los contadores
  };

  const handleLoad = (id) => {
    const selected = scripts.find((e) => e.id === id);
    setScript(selected);
    setInputText(selected.script);
    setLoad(true);
    if (isCompile) setIsCompile(false);
  };
  const handleSuggestedWordClick = (selectedWord) => {
    // Obtén el texto actual del textarea
    const text = inputText;

    // Divide el texto en palabras
    const words = text.split(/\s+/);

    // Encuentra la posición de la palabra actual que el usuario está escribiendo
    const currentWordIndex = words.length - 1;

    // Reemplaza la palabra actual con la palabra seleccionada
    words[currentWordIndex] = selectedWord;

    // Reconstruye el texto completo con la palabra seleccionada
    const updatedText = words.join(" ");

    // Actualiza el estado del texto de entrada con la palabra seleccionada
    setInputText(updatedText);

    // Borra las palabras sugeridas y restablece el índice seleccionado
    setSuggestedWords([]);
    setSelectedWordIndex(-1);
  };

  return (
    <>
      <div className="container grid grid-cols-3 grid-rows-2 gap-5 mx-auto">
        {error && <Alert error={error} />}

        {inputText && inputText.trim() !== "" && load && !isCompile ? (
          <p className="bg-red-500 text-white text-center mx-auto w-52 col-span-2 absolute top-24">
            Name: {script.text}
          </p>
        ) : (
          ""
        )}

        {inputText &&
        inputText.trim() !== "" &&
        isCompile &&
        scripts.find((e) => e.script === inputText) ? (
          <p className="bg-red-500 text-white text-center mx-auto w-52 col-span-2 absolute top-24">
            Name: {scripts.find((e) => e.script === inputText).text}.js
          </p>
        ) : (
          ""
        )}

        <textarea
          id="EA"
          className="outline outline-blue-500 h-40 p-2 resize-none font-mono"
          value={inputText}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp} // Agrega el manejador de eventos onKeyUp
          autoFocus
        />
        {
          <div className="max-h-40 overflow-y-auto w-28  relative">
            <div className="suggested-words bg-white border rounded border-gray-300 shadow-lg absolute z-10 mt-2">
              {suggestedWords.map((word, index) => (
                <div
                  key={word}
                  className={`cursor-pointer suggested-word py-1 px-2${
                    index === selectedWordIndex
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => handleSuggestedWordClick(word)}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        }

        <div className="line-word-count bg-blue-500 text-white text-center place-items-center my-auto">
          <div className="line-count">Lines: {lineCount}</div>
          <div className="word-count">Words: {wordCount}</div>
          {
            <div className="cursor-pointer">
              Cursor Pointer: ({cursorPosition.line},{cursorPosition.column})
            </div>
          }
        </div>
        <textarea
          id="TA"
          className="outline outline-blue-500 h-40 p-2 resize-none"
          value={outputText}
          readOnly
        />
        <textarea
          id="RA"
          className="outline outline-blue-500 h-40 p-2 resize-none"
          value={resultText}
          readOnly
        />

        <div className="flex flex-row gap-5 m-3 flex-wrap">
          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={handleClear}
          >
            Clear All
          </button>
          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={handleScript}
          >
            Script
          </button>

          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={handleCompile}
          >
            Compile
          </button>

          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={handleEval}
          >
            Eval
          </button>

          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={openModal}
          >
            Save
          </button>
          {isModalOpen ? (
            <Modal
              isOpen={isModalOpen}
              closeModal={() => {
                setIsModalOpen(false);
                setLoad(false);
              }}
              inputText={inputText}
              load={load}
              script={script}
            />
          ) : (
            ""
          )}
          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={openLoaded}
          >
            Load
          </button>
          {isLoaded ? (
            <ModalLoad
              isOpen={isLoaded}
              scripts={scripts}
              onClose={() => setLoaded(false)}
              handleLoad={handleLoad}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default TextEditor;
