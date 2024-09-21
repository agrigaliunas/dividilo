import React from "react";
import { BurgerMenu } from "../icons/BurgerMenu";
import { useMenu } from "../../contexts/MenuContext";

export const Header = () => {
  const { toggleMenu } = useMenu();

  const handleOpenMenu = () => {
    toggleMenu();
  };

  return (
    <header className="z-10 sticky top-0 px-5 py-2 bg-brandblue">
      <div className="flex flex-row justify-between items-center pr-5">
        <button
          onClick={handleOpenMenu}
          className="rounded-md hover:scale-110 transition-all text-white"
        >
          <BurgerMenu />
        </button>
        <h1 className="text-2xl text-white uppercase font-semibold">
          Dividilo
        </h1>
      </div>
    </header>
  );
};
