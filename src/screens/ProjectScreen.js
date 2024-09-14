import React from "react";
import { Clock } from "../components/icons/Clock.jsx";
import { CheckCircle } from "../components/icons/CheckCircle.jsx";

export const ProjectScreen = () => {
  return (
    <main className="p-16">
      <div className="bg-white rounded-xl p-4 flex flex-col gap-10">
        <div className="flex flex-row gap-10 items-end">
          <h2 className="text-6xl font-semibold">Proyectos</h2>
          <button className="p-3 bg-brandblue text-white rounded-xl hover:opacity-85 h-fit">
            Crear nuevo proyecto
          </button>
        </div>
        <div className="flex flex-col gap-12 justify-center items-start px-5">
          <section className="">
            <div className="flex flex-row gap-2 p-2 bg-orange-600 bg-opacity-40 rounded-xl w-[20vh] items-center text-gray-800 cursor-default select-none">
                <Clock />
              <span className="text-lg font-semibold text-center">
                EN PROGRESO
              </span>
              
            </div>
          </section>
          <section className="">
            <div className="flex flex-row gap-2 p-2 bg-green-600 bg-opacity-40 rounded-xl w-[20vh] items-center text-gray-800 cursor-default select-none">
                <CheckCircle />
              <span className="text-lg font-semibold text-center">
                FINALIZADOS
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
