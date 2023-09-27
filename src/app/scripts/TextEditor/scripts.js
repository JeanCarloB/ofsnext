export const handleScript = async (setInputText,inputText) => {
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

export const handleCompile = async (setInputText,inputText) => {
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
    console.log(err);
    setInputText(``);
  }
};

export const handleEval = async (setError,setResultText,outputText) => {
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
