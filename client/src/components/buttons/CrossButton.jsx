import React from "react";
import { Cross } from "../icons/Cross";

export const CrossButton = ({ handleFunction }) => {
  return (
    <button
      onClick={handleFunction}
      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-opacity-85"
    >
      <Cross />
    </button>
  );
};
