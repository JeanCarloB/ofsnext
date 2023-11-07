import React from 'react'
function Buttons({handleClear,handleCompile,handleEval,handleScript}) {
  return (
    <div className="flex flex-row gap-5 m-3 flex-wrap">
          <button
            className="bg-green-500 w-20 p-1 text-white hover:bg-green-300 mb-2"
            onClick={handleClear}
          >
            Clear All
          </button>
          <button
            className="bg-green-500 w-20 p-1 text-white hover:bg-green-300 mb-2"
            onClick={handleScript}
          >
            Script
          </button>

          <button
            className="bg-green-500 w-20 p-1 text-white hover:bg-green-300 mb-2"
            onClick={handleCompile}
          >
            Compile
          </button>

          <button
            className="bg-green-500 w-20 p-1 text-white hover:bg-green-300 mb-2"
            onClick={handleEval}
          >
            Eval
          </button>
        </div>
  )
}

export default Buttons