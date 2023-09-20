// keywordsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const KeywordsContext = createContext();

export function useKeywords() {
  const context = useContext(KeywordsContext);
  if (!context) {
    throw new Error('getKeywords debe ser utilizado dentro de un KeywordsProvider');
  }
  return context;
}

export function KeywordsProvider({ children }) {
  const [keywordsList, setKeywordsList] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await fetch(`/api/keywords`);
        const data = await response.json();
        setKeywordsList(data)
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <KeywordsContext.Provider value={keywordsList}>
      {children}
    </KeywordsContext.Provider>
  );
}


