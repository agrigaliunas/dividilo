import React from "react";
import { ProjectParticipantRounded } from "../ProjectParticipantRounded";

export const ProjectParticipants = ({ participants, editMode}) => {
  return (
    <div className="flex flex-col w-full border border-1 bg-white rounded-xl shadow-md p-5 lg:w-[50%] gap-4">
      <h2 className="text-2xl text-left font-bold">Participantes</h2>
      <span className="text-4xl font-bold">{participants.length || "1"}</span>
      <div className="flex flex-row gap-4">
        {participants.length > 0 &&
          participants.map((p) => (
            <ProjectParticipantRounded participant={p} />
          ))}
      </div>
    </div>
  );
};
