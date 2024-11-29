import React, { useEffect, useState } from "react";
import { ProjectParticipant, ProjectParticipantRounded } from "../ProjectParticipantRounded";
import { Link } from "react-router-dom";
import { fetchUsersByProjectId } from "../../services/ProjectService";
import { useAuth } from "../../contexts/AuthContext";

const participantColors = [
  "bg-brandblue"
];

export const ProjectCard = ({ project }) => {

  const [participants, setParticipants] = useState([])
  const {user} = useAuth()

  useEffect(() => {
    const loadParticipants = async () => {
      const usuariosData = await fetchUsersByProjectId(project.project_id, user.token);
      setParticipants(usuariosData);
    };
    loadParticipants();
  }, []);

  return (
    <Link
      to={`/projects/${project.project_id}`}
      className="hover:bg-gray-50 border border-1 p-2 min-h-[30vh] flex flex-col overflow-hidden gap-5 bg-white rounded-xl shadow-md"
    >
      <div className="text-center">
        <div className="lg:text-2xl text-xl font-semibold">
          {project.title}
        </div>
        <div className="lg:text-sm text-sm p-2">{project.description}</div>
      </div>
      <div className="flex flex-col justify-end items-center gap-10">
        <div className="border border-1 rounded-full bg-gray-100 w-full h-fit">
          <div className="text-xl text-center p-2 font-bold">
            ${project.total_amount}
          </div>
        </div>
        <div className="flex flex-row gap-3 w-full items-center justify-center">
          {participants.map((p, pIndex) => {
            return (
              <ProjectParticipantRounded
                key={pIndex}
                participant={p}
              />
            );
          })}
        </div>
      </div>
    </Link>
  );
};
