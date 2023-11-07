"use client";
import { useEffect, useState, useRef } from "react";
import { useKeywords } from "@/app/context/KeywordsContext";
import { useScripts } from "@/app/context/ScriptsContext";
import Alert from "./Alert";
import Counter from "./Counter";
import { TextAreaComponents } from "./TextAreaComponents";
import Buttons from "./Buttons";
import ModalLoad from "@/components/ModalLoad";
import Modal from "@/components/Modal";

const TextEditor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [resultText, setResultText] = useState("");
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

  // Define las claves para el almacenamiento local
  const EAStateKey = "EAState";
  const TAStateKey = "TAState";
  const RAStateKey = "RAState";

  // Función para guardar el estado en el almacenamiento local
  const saveStateToLocalStorage = () => {
    localStorage.setItem(EAStateKey, inputText);
    localStorage.setItem(TAStateKey, outputText);
    localStorage.setItem(RAStateKey, resultText);
  };

  // Función para cargar el estado desde el almacenamiento local
  const loadStateFromLocalStorage = () => {
    const savedEAState = localStorage.getItem(EAStateKey);
    const savedTAState = localStorage.getItem(TAStateKey);
    const savedRAState = localStorage.getItem(RAStateKey);

    if (savedEAState) setInputText(savedEAState);
    if (savedTAState) setOutputText(savedTAState);
    if (savedRAState) setResultText(savedRAState);
  };

  // Utiliza useEffect para cargar el estado cuando se monta el componente
  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);

  // Utiliza useEffect para guardar el estado cuando cambie
  useEffect(() => {
    saveStateToLocalStorage();
  }, [inputText, outputText, resultText]);

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
      console.log(data.data);
      if (data && data.data) {
        // Si la solicitud fue exitosa y data.data está definido
        setInputText(data.data.script);
      }
    } catch (err) {
      // Maneja errores de red o del servidor
      setInputText("Script not found");
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
        body: JSON.stringify({ script: inputText }),
      });
      const data = await response.json();
      !inputText || inputText.trim <= 0
        ? setError("The EA field is empty")
        : (setOutputText(data), setError(""));
    } catch (err) {
      console.log(err);
      setInputText(err.message);
    }
  };

  const handleEval = async () => {
    if (script && script.id_script) {
      try {
        const response = await fetch("/api/eval", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_script: script.id_script }),
        });
        const data = await response.json();
        console.log(data);
        if (data && data.result) {
          const trimmedResult = data.result.trim(); // Elimina espacios en blanco
          if (trimmedResult) {
            setResultText(trimmedResult);
            setError(""); // Limpia cualquier error anterior
          } else {
            setResultText("No evaluation found");
            setError(""); // Limpia cualquier error anterior
          }
        }
      } catch (err) {
        setResultText("");
        setError("No evaluation found");
      }
    } else {
      setError("Script ID is not defined");
    }
  };

  const handleOnChange = (event) => {
    if (load && inputText.trim() === "") setLoad(false);
    setInputText(event.target.value);
    const newText = event.target.value;
    setInputText(newText);
    console.log("Lo guarda");
  };

  const handleLoad = (id) => {
    const selected = scripts.find((e) => e.id_script === id);
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
      <div className="container flex flex-col justify-center">
        {error && <Alert error={error} />}

        {inputText && inputText.trim() !== "" && load && !isCompile ? (
          <p className="bg-red-500 text-white text-center mx-auto w-52 col-span-2 absolute top-24 rounded-br-xl rounded-tr-xl">
            Name: {script.description}
          </p>
        ) : (
          ""
        )}

        {inputText &&
        inputText.trim() !== "" &&
        isCompile &&
        scripts.find((e) => e.script == inputText) ? (
          <p className="bg-red-500 text-white text-center mx-auto w-52 col-span-2 absolute top-24 rounded-br-xl rounded-tr-xl">
            Name: {scripts.find((e) => e.script === inputText).description}.js
          </p>
        ) : (
          ""
        )}
        <div className="container flex gap-2 justify-evenly">
          <button
            className="bg-green-500 w-20 p-1 text-white hover:bg-green-300 mb-1"
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
            className="bg-green-500 w-20 p-1 text-white hover:bg-green-300 mb-1"
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
        <TextAreaComponents
          textareaRef={textareaRef}
          inputText={inputText}
          outputText={outputText}
          resultText={resultText}
          handleOnChange={handleOnChange}
          handleKeyUp={handleKeyUp}
        />
        <div className="flex justify-between items-center flex-wrap">
          <div className="grid grid-cols-2 grid-rows-1 mx-auto">
            {
              <div className="max-h-40 overflow-y-auto w-28  relative">
                <div className="suggested-words bg-white border rounded border-green-500 shadow-lg absolute z-10 mt-2">
                  {suggestedWords.map((word, index) => (
                    <div
                      key={word}
                      className={`cursor-pointer suggested-word py-1 px-2${
                        index === selectedWordIndex
                          ? "bg-green-500 text-white"
                          : "hover:bg-green-100"
                      } border-green-500`}
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
          </div>
          <Buttons
            handleClear={handleClear}
            handleCompile={handleCompile}
            handleEval={handleEval}
            handleScript={handleScript}
          />
        </div>
      </div>
    </>
  );
};

export default TextEditor;
