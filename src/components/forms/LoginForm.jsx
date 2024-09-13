import React, { useState } from "react";
import { Eye } from "../icons/Eye";
import { EyeSlash } from "../icons/EyeSlash";
import { Link } from "react-router-dom";
import { FormTitle } from "./FormTitle";
import { SubTitle } from "./SubTitle";

const LoginForm = () => {

  const [viewPassword, setViewPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleViewPassword = (e) => {
    e.preventDefault()
    setViewPassword(!viewPassword)
  }

  const handleSetEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSetPassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col p-6 w-[90vw] lg:h-[80vh] lg:w-[30vw] overflow-hidden bg-white rounded-xl">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <FormTitle title='Iniciar Sesión'></FormTitle>
            <SubTitle subtitle='¡Bienvenido! 👋'></SubTitle>
          </div>
          <div>
            <form action="" className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label>Correo electrónico</label>
                <input
                  className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
                  type="email"
                  placeholder="Ingrese correo electrónico..."
                  onChange={handleSetEmail}
                  value={email}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Contraseña</label>
                <div className="flex flex-row border border-1 border-[#e9e9ef] justify-between items-center w-full px-2 shadow-sm rounded-md ">
                  <input
                    className="py-3 text-sm outline-none w-full"
                    type={viewPassword ? "text" : "password"}
                    placeholder="Ingrese contraseña..."
                    onChange={handleSetPassword}
                    value={password}
                  />
                  <button onClick={handleViewPassword}>
                    {viewPassword ? <Eye /> : <EyeSlash />}
                  </button>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <button className="text-brandblue font-semibold">Olvidé mi contraseña</button>
              </div>
              <button className="bg-brandblue text-white p-2 rounded-md hover:opacity-85">Iniciar Sesión</button>
              <Link to="/register" className="bg-white text-center text-brandblue border border-brandblue p-2 rounded-md">Registrarse</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
