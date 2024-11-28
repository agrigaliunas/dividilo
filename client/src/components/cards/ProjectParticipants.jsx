import React from "react";
import { ProjectParticipantRounded } from "../ProjectParticipantRounded";
import { useAuth } from "../../contexts/AuthContext";
import { CrossButton } from "../buttons/CrossButton";

export const ProjectParticipants = ({
  projectParticipants,
  editMode,
  onDeleteParticipant,
}) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-full border border-1 bg-white rounded-xl shadow-md p-5 lg:w-[50%] gap-4">
      <h2 className="text-2xl text-left font-bold">Participantes</h2>
      <span className="text-4xl font-bold">{projectParticipants.length || "1"}</span>
      <div className="flex flex-row gap-4">
        {projectParticipants.length > 0 &&
          projectParticipants.map((p) => (
            <div key={p.user_id} className="relative">
              <ProjectParticipantRounded participant={p} />
              {editMode && p.user_id !== user.user_id && (
                <CrossButton handleFunction={() => onDeleteParticipant(p.user_id)} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
