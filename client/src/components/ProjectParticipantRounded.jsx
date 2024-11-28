import React, { useEffect, useState } from "react";
import { fetchUsuarios } from "../services/UserService";

export const ProjectParticipantRounded = ({ participant }) => {
  return (
    <div
      className={`rounded-full w-12 h-12 flex items-center justify-center border border-1 border-gray-400 bg-brandblue text-white font-semibold p-2 cursor-pointer`}
    >
      <span className="tooltip">
        {participant.initials}
        <span className="tooltiptext">
          {participant.name + " " + participant.lastname}
        </span>
      </span>
    </div>
  );
};
