import React, { useEffect, useState } from "react";
import { Clock } from "../icons/Clock.jsx"
import { CheckCircle } from "../icons/CheckCircle.jsx";
import { ProjectsGrid } from "../ProjectsGrid.jsx";

const ProjectsLayout = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchProjects = async () => {
        const data = await fetch("http://localhost:8000/proyectos").then(data => data.json())
        return data;
    }


    useEffect(() => {
        const loadProjects = async () => {
            const projectsData = await fetchProjects()
            setProjects(projectsData)
            setLoading(false)
        };
        loadProjects();
    }, [])

    return (
        <main className="p-16">
            <div className="bg-white rounded-xl p-4 flex flex-col gap-10">
                <div className="flex flex-row gap-10 items-end px-5">
                    <h2 className="text-6xl font-semibold">Proyectos</h2>
                    <button className="p-3 bg-brandblue text-white rounded-xl hover:opacity-85 h-fit">
                        Crear nuevo proyecto
                    </button>
                </div>
                <div className="flex flex-col gap-8 justify-center items-start px-5">
                    <section className="">
                        <div className="flex flex-row gap-4 p-2 bg-orange-600 bg-opacity-40 rounded-xl w-[20vh] items-center text-gray-800 cursor-default select-none">
                            <Clock />
                            <span className="text-lg font-semibold text-center">
                                EN PROGRESO
                            </span>
                        </div>
                        <ProjectsGrid projects={projects} estado={"En progreso"}></ProjectsGrid>
                    </section>
                    <section className="">
                        <div className="flex flex-row gap-4 p-2 bg-green-600 bg-opacity-40 rounded-xl w-[20vh] items-center text-gray-800 cursor-default select-none">
                            <CheckCircle />
                            <span className="text-lg font-semibold text-center">
                                FINALIZADOS
                            </span>
                        </div>
                        <ProjectsGrid projects={projects} estado={"Finalizado"}></ProjectsGrid>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default ProjectsLayout;