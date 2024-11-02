import React from "react";
import { Cross } from "../icons/Cross";

export const CrossButton = ({ handleFunction }) => {
  return (
    <button
      onClick={handleFunction}
      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
    >
      <Cross />
    </button>
  );
};
