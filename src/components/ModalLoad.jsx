"use client";
import React, { useState ,useEffect} from "react";

const ScriptModal = ({ isOpen, scripts, onClose, handleLoad }) => {
  const [selectedScript, setSelectedScript] = useState();
  const [scriptscod, setScriptscod] = useState(scripts);
  
 useEffect(() => {
    // Actualizar el estado de los scripts cuando initialScripts cambie
    setScriptscod(scripts);
  }, [scripts]);

  const handleScriptChange = (scriptId) => {
    setSelectedScript(scriptId);
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto z-50`}
    >
      <div className="flex items-center justify-center min-h-
	  screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            isOpen
              ? "ease-out duration-300 opacity-100 translate-y-0 sm:scale-100"
              : "ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          }`}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* Ícono o contenido en el encabezado del modal */}
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {/* Inserta aquí el ícono que desees */}
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h2>Select one script</h2>
                <ul>
                  {scripts.map((script) => (
                    <li key={script.id_script}>
                      <input
                        type="radio"
                        id={script.id_script}
                        name="id_load"
                        value={script.id_script}
                        onChange={() => handleScriptChange(script.id_script)}
            checked={selectedScript === script.id_script}
                      />
                      <label htmlFor={script.id_script}>{script.id_script} - {script.description}</label>
                    </li>
                  ))}

                </ul>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={()=>handleLoad(selectedScript)}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Load
          </button>
          <button
            onClick={onClose}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ScriptModal;
