"use client";
import { useState, useEffect } from "react";

function AboutPage() {
  const [about, setAbout] = useState({});
  const [isCharged, setIsCharged] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // Estado para controlar si el popover está abierto

  const fetchAboutInfo = async () => {
    try {
      const response = await fetch(`/api/about`);
      const data = await response.json();
      setAbout(data);
      setIsCharged(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAboutInfo();
  }, [about]);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <section className="flex flex-col">
      {isCharged ? (
        <>
          <button onClick={togglePopover} className="mx-auto mb-3 p-2 bg-blue-700 text-white hover:bg-blue-400">
            {isPopoverOpen ? "Close About Info" : "Open About Info"}
          </button>
          {isPopoverOpen && (
            <div
              className="text-white container-fluid flex-col bg-blue-600 text-center w-96 justify-center items-center mx-auto p-2 rounded-lg"
            >
              <h2 className="font-bold mb-2">Designed by: </h2>
              <ul className="list-none bg-black p-2 mb-2 rounded-lg">
                {about.equipo.map((e, i) => (
                  <li
                    key={i}
                    className="transition ease-in-out delay-150 mb-3 hover:bg-white hover:text-black cursor-pointer"
                  >
                    {e}
                  </li>
                ))}
              </ul>
              <p className="mb-2">{about.escuela}</p>
              <p className="mb-2">{about.universidad}</p>
              <p className="mb-2">{about.semestre}</p>
              <p className="mb-2">{about.año}</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-white container-fluid flex flex-col bg-blue-600 text-center w-96 justify-center items-center mx-auto p-2 rounded-lg">
          Loading...
        </div>
      )}
    </section>
  );
}

export default AboutPage;
