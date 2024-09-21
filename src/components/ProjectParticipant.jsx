import React from "react";

export const ProjectParticipant = ({ participant, color }) => {
  const nameParts = participant.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");

  return (
    <div className={`${color} rounded-full flex items-center justify-center p-2 h-10 w-10`}>
      <span>{initials}</span>
    </div>
  );
};
