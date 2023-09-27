"use client";
import { createContext, useContext, useEffect, useState } from "react";


const OFSContext = createContext();

export const useKeywords = () => {
  const context = useContext(OFSContext);
  if (!context) throw new Error("useKeywords must be used within a OFSProvider");
  return context;
};

export const OFSProvider = ({ children }) => {
  // save in localStorage
  const [keywords, setKeywords] = useState([]);

  useEffect(() =>{
  fetch(`/api/keywords`)
  .then((response) => response.json())
  .then((data) => setKeywords(data.keywords))
  .catch((error) => console.error('Error fetching keywords:', error));
  }, []);

  return (
    <OFSContext.Provider
      value={
        keywords
      }
    >
      {children}
    </OFSContext.Provider>
  );
};