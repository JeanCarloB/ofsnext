"use client";
import { useEffect, useState, useRef } from "react";
import { useKeywords } from "@/app/context/KeywordsContext";
import { useScripts } from "@/app/context/ScriptsContext";
import Alert from "./Alert";
import Counter from "./Counter";
import { TextAreaComponents } from "./TextAreaComponents";
import Buttons from "./Buttons";

const TextEditor = () => {

    // Obtener datos desde localStorage o usar valores predeterminados
    const savedText = typeof window !== 'undefined' ? localStorage.getItem("textEditorContent") || "" : "";
    const savedOutputText = typeof window !== 'undefined' ? localStorage.getItem("textEditorOutputText") || "":"";
    const savedResultText = typeof window !== 'undefined' ? localStorage.getItem("textEditorResultText") || "":"";
  
  const [inputText, setInputText] = useState(savedText);
  const [outputText, setOutputText] = useState(savedOutputText);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [resultText, setResultText] = useState(savedResultText);
  const [error, setError] = useState("");
  const [suggestedWords, setSuggestedWords] = useState([]);
  const [selectedWordIndex, setSelectedWordIndex] = useState(-1);
  const [isLoaded, setLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [script, setScript] = useState();
  const [isCompile, setIsCompile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keywords = useKeywords();
  const scripts = useScripts();
  const textareaRef = useRef(null);

  const handleKeyUp = ({ target: { value } }) => {
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
      setIsCompile(false);
      setScript();
      setCursorPosition({ line: 1, column: 1 });
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


  useEffect(() => {
    getCursorPosition();
  }, []); 

  const getCursorPosition = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const selectionStart = textarea.selectionStart;
      const text = textarea.value;
      const lines = text.substr(0, selectionStart).split("\n");
      const currentLine = lines.length;
      const currentColumn = lines[currentLine - 1].length + 1;
      setCursorPosition({ line: currentLine, column: currentColumn });
    }
  };

  const handleScript = async () => {
    try {
      const response = await fetch(`/api/script/${inputText}`, {
        method: "GET",
      });
      const data = await response.json();
      
      if (data && data.data) {
        // Si la solicitud fue exitosa y data.data está definido
        setInputText(data.data.script);
      } else {
        // Maneja el caso en el que no se encontró el script
        setInputText("Script not found");
      }
    } catch (err) {
      // Maneja errores de red o del servidor
      setInputText("Internal Server Error");
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

      // Guardar outputText en el almacenamiento local
      localStorage.setItem("textEditorOutputText", data.result);
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

      if (data && data.result && scripts.find((e) => e.script === inputText)) {
        // Si 'data' y 'data.result' están definidos y no son nulos o indefinidos,
        // entonces tenemos información válida en 'data'
        setResultText(data.result);
        setError("");
      } else {
        setResultText("");
        setError("Not result finded");
      }
      localStorage.setItem("textEditorResultText", data.result);
    } catch (err) {
      setResultText("");
      setError("TA is empty");
    }
  };

  const handleOnChange = (event) => {
    if (load && inputText.trim() === "") setLoad(false);
    setInputText(event.target.value);
    const newText = event.target.value;
    setInputText(newText);

    // Guardar en localStorage
    console.log("Lo guarda")
    localStorage.setItem("textEditorContent", newText);
  };

  const handleLoad = (id) => {
    const selected = scripts.find((e) => e.id === id);
    setScript(selected);
    setInputText(selected.script);
    localStorage.setItem("textEditorContent", inputText);
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

        <TextAreaComponents
          textareaRef={textareaRef}
          inputText={inputText}
          outputText={outputText}
          resultText={resultText}
          handleOnChange={handleOnChange}
          handleKeyUp={handleKeyUp}
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
                  onClick={
                    inputText.trim() <= 0 && inputText
                      ? ""
                      : () => handleSuggestedWordClick(word)
                  }
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        }

        <Counter text={inputText} cursorPosition={cursorPosition} />

        <Buttons
          handleClear={handleClear}
          handleCompile={handleCompile}
          handleEval={handleEval}
          handleLoad={handleLoad}
          handleScript={handleScript}
          openModal={openModal}
          isModalOpen={isModalOpen}
          inputText={inputText}
          load={load}
          script={script}
          openLoaded={openLoaded}
          isLoaded={isLoaded}
          scripts={scripts}
          setIsModalOpen={(e) => setIsModalOpen(e)}
          setLoad={(e) => setLoad(e)}
          setLoaded={(e) => setLoaded(e)}
        />
      </div>
    </>
  );
};

export default TextEditor;
