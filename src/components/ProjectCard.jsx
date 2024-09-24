import React from "react";
import { ProjectParticipant } from "./ProjectParticipant";
import { Link } from "react-router-dom";

const participantColors = [
  "bg-orange-400",
  "bg-red-400",
  "bg-yellow-400",
  "bg-blue-400",
  "bg-green-400",
];

export const ProjectCard = ({ project }) => {
  const participants = project.participantes || [];

  return (
    <Link
      to={`/projects/${project.id}`}
      className="hover:bg-gray-50 border border-1 rounded-lg p-2 min-h-[30vh] shadow-md flex flex-col overflow-hidden gap-5"
    >
      <div className="text-center">
        <div className="lg:text-2xl text-xl font-semibold">
          {project.nombre}
        </div>
        <div className="lg:text-sm text-sm p-2">{project.descripcion}</div>
      </div>
      <div className="flex flex-col justify-end items-center lg:gap-3 gap-10">
        <div className="border border-1 rounded-full bg-gray-100 w-full h-fit">
          <div className="text-xl text-center p-2 font-bold">
            Restante: ${project.montoTotalProyecto.toFixed(2)}
          </div>
        </div>
        <div className="flex flex-row gap-3 w-full items-center justify-center">
          {participants.map((p, index) => {
            const uniqueColor =
              participantColors[index % participantColors.length];
            return (
              <ProjectParticipant
                key={p.id}
                participant={p}
                color={uniqueColor}
              />
            );
          })}
        </div>
      </div>
    </Link>
  );
};
