import React from 'react'

function Alert({error}) {
  return (
    <p className="bg-red-500 text-white text-center mx-auto w-52 col-span-2 absolute top-24 rounded-br-xl rounded-tr-xl">{error}</p>
  )
}

export default Alert