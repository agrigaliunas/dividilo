import React, { useState } from "react";
import { Eye } from "./icons/Eye";
import { EyeSlash } from "./icons/EyeSlash";

const AuthForm = () => {

  const [viewPassword, setViewPassword] = useState(false)

  const handleViewPassword = (e) => {

    e.preventDefault()

    setViewPassword(!viewPassword)

  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col p-6 w-[90vw] h-[80vh] lg:w-[30vw] border border-1 border-[#e9e9ef] rounded-md shadow-sm">
        <div className="w-full flex flex-col gap-16">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Iniciar Sesión</h1>
            <span>¡Bienvenido! 👋</span>
          </div>
          <div>
            <form action="" className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label>Correo electrónico</label>
                <input
                  className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
                  type="email"
                  placeholder="Ingrese correo electrónico..."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Contraseña</label>
                <div className="flex flex-row border border-1 border-[#e9e9ef] justify-between items-center w-full px-2 shadow-sm rounded-md ">
                  <input
                    className="py-3 text-sm outline-none w-full"
                    type= {viewPassword ? "text": "password" }
                    placeholder="Ingrese contraseña..."
                  />
                  <button onClick={handleViewPassword}>
                    {viewPassword ?<Eye/>: <EyeSlash/>}
                  </button>
                  
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <button className="text-brandblue font-semibold">Olvidé mi contraseña</button>
              </div>
              <button className="bg-brandblue text-white p-2 rounded-md hover:opacity-85">Iniciar Sesión</button>
              <button className="bg-white text-brandblue border border-brandblue p-2 rounded-md">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
