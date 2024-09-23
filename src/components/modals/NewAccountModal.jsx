import React, { useState } from "react";
import { X } from "../icons/X";

export const NewAccountModal = ({ children, handleCreateAccount, closeModal }) => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rol, setRol] = useState("Elige un rol");

  const isDisabled = !email || !nombre || !apellido || rol === "Elige un rol";

  const handleSubmit = () => {
    const newAccount = {
      email,
      nombre,
      apellido,
      rol,
      password: "123456",
    };
    handleCreateAccount(newAccount);
    closeModal();
  };

  return (
    <div
      id="modal-overlay"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="relative bg-white rounded-lg p-5 w-[90%] sm:w-[80%]">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese email de la cuenta nueva"
            className="border rounded-lg p-2 w-full text-xs"
          />
          <label className="font-semibold">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingrese nombre de la cuenta nueva"
            className="border rounded-lg p-2 w-full text-xs"
          />
          <label className="font-semibold">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ingrese apellido de la cuenta nueva"
            className="border rounded-lg p-2 w-full text-xs"
          />
          <label className="font-semibold">Rol</label>
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            name="rol"
            className="text-xs border p-1"
          >
            <option value="Elige un rol" className="text-xs p-1">
              Elige un rol
            </option>
            <option value="admin" className="text-xs p-1">
              ADMIN
            </option>
            <option value="usuario" className="text-xs p-1">
              USUARIO
            </option>
          </select>
          <p className="text-xs">La contraseña por default será "123456"</p>
          <button
            onClick={handleSubmit}
            disabled={isDisabled} 
            className={`rounded-lg w-full text-center p-2 text-white ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-opacity-90"
            }`}
          >
            Crear cuenta
          </button>
        </div>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        {children}
      </div>
    </div>
  );
};
