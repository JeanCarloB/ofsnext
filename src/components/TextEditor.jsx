"use client";
import { useState } from "react";
import { useKeywords } from "@/app/context/KeywordsContext";
import { useScripts } from "@/app/context/ScriptsContext";
import Modal from "@/components/Modal";
import ModalLoad from "@/components/ModalLoad";

const TextEditor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  //const [predictedKeywords, setPredictedKeywords] = useState([]);
  const [lineCount, setLineCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const [load, setLoad] = useState(false);
  const [script, setScript] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const keywords = useKeywords();
  const scripts = useScripts();

  const handleClear = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the text?"
    );
    if (confirmed) {
      setInputText("");
      setOutputText("");
      setResultText("");
      setError("");
    }
  };

  const openModal = () => {
    inputText && inputText.trim() !== "" ? setIsModalOpen(true) : setIsModalOpen(false);
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
        body: JSON.stringify({ text: outputText }),
      });
      const data = await response.json();
      !outputText || outputText.trim <= 0
        ? setError("The TA field is empty")
        : (setResultText(data.result), setError(""));
    } catch (err) {
      setResultText(``);
    }
  };

  const handleOnChange = ({ target: { value } }) => {
    setInputText(value);
    countLinesAndWords(value); // Actualiza los contadores
  };

  const handleLoad = (id) => {
    const selected=scripts.find(e=>e.id===id);
    setScript(selected);
    setInputText(selected.script)
    setLoad(true);
  };

  return (
    <>
      <div className="container grid grid-cols-2 gap-5 mx-auto">
      
        {error && (
          <p className="bg-red-500 text-white text-center mx-auto w-52 col-span-2 absolute top-24">
            {error}
          </p>
        )}

        {(inputText && inputText.trim() !== "") && load ? <p className="bg-red-500 text-white text-center mx-auto w-52 col-span-2 absolute top-24">Name: {script.text}</p>:""}
        <textarea
          id="EA"
          className="outline outline-blue-500 h-40 p-2 resize-none font-mono"
          value={inputText}
          onChange={handleOnChange}
          autoFocus
        />
        <div className="line-word-count bg-blue-500 text-white text-center place-items-center my-auto">
          <div className="line-count">Lines: {lineCount}</div>
          <div className="word-count">Words: {wordCount}</div>
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
          {isModalOpen ? <Modal isOpen={isModalOpen} closeModal={()=>{setIsModalOpen(false);setLoad(false)}} inputText={inputText} load={load} script={script}/>:""}
          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={openLoaded}
          >
            Load
          </button>
          {isLoaded ? <ModalLoad isOpen={isLoaded} scripts={scripts} onClose={()=>setLoaded(false)} handleLoad={handleLoad}/>:""}
        </div>
      </div>
    </>
  );
};

export default TextEditor;
