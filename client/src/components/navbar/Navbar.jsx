import React from "react";
import { useMenu } from "../../contexts/MenuContext";
import { useAuth } from "../../contexts/AuthContext.js";
import { Cross } from "../icons/Cross";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Bell } from "../icons/Bell";
import { InfoAccount } from "../icons/InfoAccount";
import { Logout } from "../icons/Logout";
import { DocumentText } from "../icons/DocumentText";
import { Currency } from "../icons/Currency";
import { UserPlus } from "../icons/UserPlus.jsx";
import { Adjustment } from "../icons/Adjustment.jsx";

export const Navbar = () => {
  const { isMenuOpen, closeMenu } = useMenu();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    navigate("/home");
  };

  return (
    <nav
      className={`z-50 w-[80vw] lg:w-[20vw] h-full shadow-md border border-gray-100 rounded-r-xl fixed bg-white top-0 left-0 transition-transform duration-300 ease-in-out 
            transform ${
              isMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full pointer-events-none"
            }`}
    >
      <div className="flex h-full relative py-24">
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 text-xl font-bold hover:opacity-70"
        >
          <Cross />
        </button>
        <div className="flex flex-col text-2xl text-left gap-4 w-full px-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hover:bg-gray-100 w-full py-1 rounded-md px-4"
                onClick={closeMenu}
              >
                <span className="flex flex-row gap-1 items-center">
                  <Currency />
                  Mis proyectos
                </span>
              </Link>
              <Link
                to="/notifications"
                className="hover:bg-gray-100 w-full py-1 rounded-md px-4"
                onClick={closeMenu}
              >
                <span className="flex flex-row gap-1 items-center">
                  <Bell />
                  Notificaciones
                </span>
              </Link>
              <Link
                to="/account"
                className="hover:bg-gray-100 w-full py-1 rounded-md px-4"
                onClick={closeMenu}
              >
                <span className="flex flex-row gap-1 items-center">
                  <InfoAccount />
                  Mi cuenta
                </span>
              </Link>
              <Link
                className="hover:bg-gray-100 w-full py-1 rounded-md px-4"
                onClick={closeMenu}
              >
                <button
                  onClick={logoutUser}
                  className="flex flex-row gap-1 items-center"
                >
                  <Logout />
                  Cerrar sesión
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:bg-gray-100 w-full py-1 rounded-md px-4"
                onClick={closeMenu}
              >
                <span className="flex flex-row gap-1 items-center">
                  <InfoAccount />
                  Iniciar sesión
                </span>
              </Link>
              <Link
                to="/register"
                className="hover:bg-gray-100 w-full py-1 rounded-md px-4"
                onClick={closeMenu}
              >
                <span className="flex flex-row gap-1 items-center">
                  <UserPlus style="size-6"/>
                  Registrarse
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
