"use client";
import { useState, useEffect } from "react";

function AboutPage() {
  const [about, setAbout] = useState({});
  const [isCharged,setIsCharged]=useState(false);
  
  const fetchAboutInfo=async()=>{
    try{
      const response= await fetch(`/api/about`);
      const data=await response.json();
      setAbout(data)
      setIsCharged(true)
    }catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchAboutInfo()
  }, []);

  return (
    <section>
      <h1 className="text-white text-center font-bold text-lg mb-3">About page</h1>
      {isCharged?(<div className="text-white container-fluid flex flex-col bg-red-600 text-center w-96 justify-center items-center mx-auto p-2 rounded-lg">
        <h2 className="font-bold mb-2">Creado por: </h2>
        <ul className=" list-none bg-black p-2 mb-2 rounded-lg">
          {about.equipo.map((e,i) => (
            <li key={i} className=" transition ease-in-out delay-150 mb-3 hover:bg-white hover:text-black cursor-pointer">{e}</li>
          ))}
        </ul>
        <p className="mb-2">{about.escuela}</p>
        <p className="mb-2">{about.universidad}</p>
        <p className="mb-2">{about.semestre}</p>
        <p className="mb-2">{about.año}</p>
      </div>):(<div className="text-white container-fluid flex flex-col bg-red-600 text-center w-96 justify-center items-center mx-auto p-2 rounded-lg">Cargando...</div>)}
    </section>
  );
}

export default AboutPage;
