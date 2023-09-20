"use client";
import { useState } from "react";
import KeywordChecker from "@/components/KeywordChecker";

const TextEditor = ({ keywordsList }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [resultText, setResultText] = useState("");

  const handleClear = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear the text?"
    );
    if (confirmed) {
      setInputText("");
      setOutputText("");
      setResultText("");
    }
  };

  // ... (previous code)

  const handleKeyWords = async () => {
    try {
      const response = await fetch(`/api/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }), // Asegúrate de que inputText tenga un valor válido
      });

      const data = await response.json();
      setResultText(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    const words = newText.split(/\s+/);

    let processedText = words.reduce(
      (acc, cur) =>
        keywordsList.includes(cur.trim()) ? (acc += " " + cur.trim()) : acc,
      ""
    );

    setInputText(newText);
    setOutputText(processedText);
  };

  return (
    <div className="container grid grid-cols-2 grid-rows-2 gap-5 p-2 mx-auto">
      <textarea
        id="EA"
        className="border border-black  h-40 p-2 resize-none"
        value={inputText}
        onChange={handleInputChange}
        autoFocus
      />
      <textarea
        id="TA"
        className="border border-black  h-40 p-2 resize-none"
        value={outputText}
        readOnly
      />
      <textarea
        id="RA"
        className="border border-black  h-40 p-2 resize-none"
        value={resultText}
        readOnly
      />
      <div className="grid grid-rows-1 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 justify-around items-center">
        <button
          className=" bg-red-500 w-20 p-1 text-white hover:bg-red-300 mb-2 "
          onClick={handleClear}
        >
          Clear All
        </button>
        <button
          className=" bg-red-500 w-20 p-1 text-white hover:bg-red-300 mb-2 "
          onClick={handleKeyWords}
        >
          Send to Server
        </button>
      </div>
      <KeywordChecker text={inputText} keywordsList={keywordsList} />
    </div>
  );
};

export default TextEditor;
