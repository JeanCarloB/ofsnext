"use client";
import { useState, useEffect } from "react";

function AboutPage() {
  const [about, setAbout] = useState({});
  const [isCharged, setIsCharged] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Estado para controlar si el popover está abierto

  useEffect(() => {
    fetch(`/api/about`)
      .then((response) => response.json())
      .then((data) => {
        setAbout(data);
        setIsCharged(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [about.nombre]);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <section className="flex flex-col justify-center items-center">
      {isCharged ? (
        <>
          <button
            onClick={togglePopover}
            className="mx-auto mb-3 p-2 bg-green-700 text-white hover:bg-green-400"
          >
            {isPopoverOpen ? "Close About Info" : "Open About Info"}
          </button>
          {isPopoverOpen && (
            <div className="text-white container-fluid flex-col h-1/2 bg-green-600 text-center w-96 justify-center items-center mx-auto p-2 rounded-lg overflow-auto">
              <h2 className="font-bold mb-2">Designed by: </h2>
              <ul className="list-none bg-black p-2 mb-2 rounded-lg grid grid-cols-2 grid-rows-2 gap-2">
                {about.map((e, i) => (
                  <div key={i}>
                    <li>
                      <p className="mb-2 hover:bg-slate-100 hover:text-black">{e.nombre}</p>
                    </li>
                    <li>
                      <p className="mb-2 hover:bg-slate-100 hover:text-black">{e.escuela}</p>
                    </li>
                    <li>
                      <p className="mb-2 hover:bg-slate-100 hover:text-black">{e.universidad}</p>
                    </li>
                    <li>
                      <p className="mb-2 hover:bg-slate-100 hover:text-black">{e.semestre}</p>
                    </li>
                    <li>
                      <p className="mb-2 hover:bg-slate-100 hover:text-black">{e.año}</p>
                    </li>
                    <hr/>
                  </div>
                  
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="text-white container-fluid flex flex-col bg-green-600 text-center w-96 justify-center items-center mx-auto p-2 rounded-lg">
          Loading...
        </div>
      )}
    </section>
  );
}

export default AboutPage;
