import React, { useEffect, useState } from "react";
import { ChevronDown } from "../icons/ChevronDown.jsx";
import { ProjectsGrid } from "../ProjectsGrid.jsx";
import { ChevronUp } from "../icons/ChevronUp.jsx";

const ProjectsLayout = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toggleInProgress, setToggleInProgress] = useState(false);
  const [toggleFinished, setToggleFinished] = useState(false);

  const fetchProjects = async () => {
    const data = await fetch("http://localhost:8000/proyectos").then((data) =>
      data.json()
    );
    return data;
  };

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
      setLoading(false);
    };
    loadProjects();
  }, []);

  const handleToggleInProgress = () => {
    setToggleInProgress(!toggleInProgress);
  };

  const handleToggleFinished = () => {
    setToggleFinished(!toggleFinished);
  };

  return (
    <div className="py-16">
      <div className="bg-white rounded-xl p-4 flex flex-col lg:gap-10 gap-5 w-[90vw] ">
        <div className="flex lg:flex-row flex-col lg:gap-5 gap-2 lg:items-end items-start justify-center lg:justify-start">
          <h2 className="lg:text-5xl text-4xl font-semibold">Proyectos</h2>
          <button className="p-2 bg-brandblue text-white rounded-xl hover:opacity-85 h-fit text-xs lg:text-base">
            Crear nuevo proyecto
          </button>
        </div>
        <div className="flex flex-col gap-8 justify-center items-start">
          <section className="w-full">
            <div className="flex flex-row p-2 bg-orange-600 bg-opacity-40 rounded-xl lg:w-[15vw] w-[40vw] items-center justify-center gap-2 text-gray-800 cursor-default select-none text-xs lg:text-sm">
              <button
                onClick={handleToggleInProgress}
                className="bg-gray-600 bg-opacity-20 rounded-full hover:bg-opacity-15"
              >
                {toggleInProgress ? <ChevronDown /> : <ChevronUp />}
              </button>
              <span className="lg:text-md text-xs font-semibold text-center">
                EN PROGRESO
              </span>
            </div>
            {!toggleInProgress && (
              <ProjectsGrid
                projects={projects}
                estado={"En progreso"}
              ></ProjectsGrid>
            )}
          </section>
          <section className="w-full">
            <div className="flex flex-row p-2 bg-green-600 bg-opacity-40 rounded-xl lg:w-[15vw] w-[40vw] items-center justify-center gap-2 text-gray-800 cursor-default select-none text-xs lg:text-sm">
              <button
                onClick={handleToggleFinished}
                className="bg-gray-600 bg-opacity-20 rounded-full hover:bg-opacity-15"
              >
                {toggleFinished ? <ChevronDown /> : <ChevronUp />}
              </button>{" "}
              <span className="lg:text-md text-xs font-semibold text-center">
                FINALIZADOS
              </span>
            </div>
            {!toggleFinished && (
              <ProjectsGrid
                projects={projects}
                estado={"Finalizado"}
              ></ProjectsGrid>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectsLayout;
