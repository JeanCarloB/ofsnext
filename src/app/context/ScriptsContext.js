"use client";
import { createContext, useContext, useEffect, useState } from "react";


const ScriptsContext = createContext();

export const useScripts = () => {
  const context = useContext(ScriptsContext);
  if (!context) throw new Error("usescripts must be used within a OFSProvider");
  return context;
};

export const ScriptsProvider = ({ children }) => {
  // save in localStorage
  const [scripts, setScripts] = useState([]);
  
  useEffect(() =>{
  fetch(`/api/script`)
  .then((response) => response.json())
  .then((data) => setScripts(data.scripts))
  .catch((error) => console.error('Error fetching scripts:', error));
  }, []);

  return (
    <ScriptsContext.Provider
      value={
        scripts
      }
    >
      {children}
    </ScriptsContext.Provider>
  );
};