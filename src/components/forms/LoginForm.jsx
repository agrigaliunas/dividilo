import React, { useState } from "react";
import { Eye } from "../icons/Eye";
import { EyeSlash } from "../icons/EyeSlash";
import { Link } from "react-router-dom";
import { FormTitle } from "./FormTitle";
import { SubTitle } from "./SubTitle";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm = () => {

  const { login } = useAuth()

  const [viewPassword, setViewPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleViewPassword = (e) => {
    e.preventDefault()
    setViewPassword(!viewPassword)
  }

  const handleSetEmail = (e) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
  }

  const handleSetPassword = (e) => {
    setPassword(e.target.value)
    validatePassword(e.target.value)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Ingrese un correo válido.")
    } else {
      setEmailError("")
    }
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.")
    } else {
      setPasswordError("")
    }
  }

  const loginUser = (e) => {
    e.preventDefault()
    if (emailError || passwordError || !email || !password) {
      return;
    }
    const userData = {
      "id": "2",
      "email": "lauta.jimenez@gmail.com",
      "nombre": "Lautaro",
      "apellido": "Jimenez",
      "rol": "admin"
    }
    login(userData)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col p-6 w-[90vw] lg:h-[95vh] lg:w-[40vw] bg-white rounded-xl">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <FormTitle title='Iniciar Sesión'></FormTitle>
            <SubTitle subtitle='¡Bienvenido! 👋'></SubTitle>
          </div>
          <div>
            <form action="" className="flex flex-col gap-3" onSubmit={loginUser}>
              <div className="flex flex-col gap-1">
                <label>Correo electrónico</label>
                <input
                  className={`px-2 py-3 border ${emailError ? 'border-red-600' : 'border-[#e9e9ef]'} shadow-sm outline-none rounded-md text-sm`}
                  type="email"
                  placeholder="Ingrese correo electrónico..."
                  onChange={handleSetEmail}
                  value={email}
                />
                {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label>Contraseña</label>
                <div className={`flex flex-row border ${passwordError ? 'border-red-600' : 'border-[#e9e9ef]'} justify-between items-center w-full px-2 shadow-sm rounded-md`}>
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
                {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
              </div>
              <div className="flex flex-row justify-end">
                <Link to="/forgot-password" className="text-brandblue font-semibold">Olvidé mi contraseña</Link>
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
