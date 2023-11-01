export const handleScript = async (setInputText,inputText) => {
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

export const handleCompile = async (setInputText,inputText,setOutputText) => {
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

export const handleEval = async () => {
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
  } catch (err) {
    setResultText("");
    setError("TA is empty");
  }
};