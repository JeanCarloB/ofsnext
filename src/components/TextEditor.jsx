"use client";
import { useState } from "react";

const TextEditor = () => {
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

  const handleScript = async () => {
    try {
      const response = await fetch(`/api/script/${inputText}`, {
        method: "GET",
      });
      const data = await response.json();
      setInputText(data.message);
    } catch (err) {
      setInputText(``);
    }
  };

  const handleCompile = async () => {
    try {
      const response = await fetch('/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text:inputText}),
      });
      const data = await response.json();
      setOutputText(data.result);
    } catch (err) {
      setInputText(``);
    }
  };

  const handleEval = async () => {
    try {
      const response = await fetch('/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text:outputText}),
      });
      const data = await response.json();
      setResultText(data.result);
    } catch (err) {
      setResultText(``);
    }
  };

  return (
    <div className="container grid grid-cols-2 grid-rows-2 gap-5 p-2 mx-auto">
      <textarea
        id="EA"
        className="border border-black  h-40 p-2 resize-none"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
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
          onClick={handleScript}
        >
          Script
        </button>

        <button
          className=" bg-red-500 w-20 p-1 text-white hover:bg-red-300 mb-2 "
          onClick={handleCompile}
        >
          Compile
        </button>

        <button
          className=" bg-red-500 w-20 p-1 text-white hover:bg-red-300 mb-2 "
          onClick={handleEval}
        >
          Eval
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
