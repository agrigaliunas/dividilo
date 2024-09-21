import React from "react";

export const MyAccountSectionTitle = ({
  section,
  icon,
  actualStep,
  changeStep,
}) => {
  return (
    <div
      className={`rounded-xl content-center transition-all ${
        section.step === actualStep
          ? "text-white bg-brandblue lg:hover:bg-gray-100 lg:hover:text-black"
          : "bg-gray-100  lg:hover:bg-brandblue lg:hover:text-white"
      }`}
    >
      <button
        className="flex flex-row px-4 py-2 items-center text-left"
        onClick={() => changeStep(section.step)}
      >
        <span className="mr-2">{icon}</span>
        {section.title}
      </button>
    </div>
  );
};
