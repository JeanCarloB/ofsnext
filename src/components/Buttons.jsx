import React from 'react'
import ModalLoad from '@/components/ModalLoad';
import Modal from '@/components/Modal';
function Buttons({handleClear,handleCompile,handleEval,handleLoad,handleScript,openModal,isModalOpen,inputText,load,script,openLoaded,isLoaded,scripts,setIsModalOpen,setLoad,setLoaded}) {
  return (
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
          {isModalOpen ? (
            <Modal
              isOpen={isModalOpen}
              closeModal={() => {
                setIsModalOpen(false);
                setLoad(false);
              }}
              inputText={inputText}
              load={load}
              script={script}
            />
          ) : (
            ""
          )}
          <button
            className="bg-blue-500 w-20 p-1 text-white hover:bg-blue-300 mb-2"
            onClick={openLoaded}
          >
            Load
          </button>
          {isLoaded ? (
            <ModalLoad
              isOpen={isLoaded}
              scripts={scripts}
              onClose={() => setLoaded(false)}
              handleLoad={handleLoad}
            />
          ) : (
            ""
          )}
        </div>
  )
}

export default Buttons