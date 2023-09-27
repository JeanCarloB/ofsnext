"use client";
import { createContext, useContext, useEffect, useState } from "react";


const KeywordsContext = createContext();

export const useKeywords = () => {
  const context = useContext(KeywordsContext);
  if (!context) throw new Error("useKeywords must be used within a OFSProvider");
  return context;
};

export const KeywordsProvider = ({ children }) => {
  // save in localStorage
  const [keywords, setKeywords] = useState([]);
  
  useEffect(() =>{
  fetch(`/api/keywords`)
  .then((response) => response.json())
  .then((data) => setKeywords(data.keywords))
  .catch((error) => console.error('Error fetching keywords:', error));
  }, [keywords]);

  return (
    <KeywordsContext.Provider
      value={
        keywords
      }
    >
      {children}
    </KeywordsContext.Provider>
  );
};