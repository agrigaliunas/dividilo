import React, { useState } from "react";
import { Eye } from "../icons/Eye";
import { EyeSlash } from "../icons/EyeSlash";
import { Link, useNavigate } from "react-router-dom";
import { FormTitle } from "./FormTitle";
import { SubTitle } from "./SubTitle";
import {crearCuenta} from "../../services/AuthService.js"
import { useAuth } from "../../contexts/AuthContext";

const RegisterForm = () => {

  const [viewPassword, setViewPassword] = useState(false)
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("")

  const navigate = useNavigate()

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

  const handleSetConfirmedPassword = (e) => {
    setConfirmedPassword(e.target.value)
    validateConfirmedPassword(password, e.target.value)
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.")
    } else {
      setPasswordError("")
    }
  }

  const validateConfirmedPassword = (password, confirmedPassword) => {
    if (password !== confirmedPassword) {
      setConfirmedPasswordError("Las contraseñas no coinciden.")
    } else {
      setConfirmedPasswordError("")
    }
  }

  const handleSetName = (e) => {
    setName(e.target.value)
  }

  const handleSetSurname = (e) => {
    setSurname(e.target.value)
  }

  const registerUser = async (e) => {

    e.preventDefault()
    if (emailError || passwordError || confirmedPasswordError || !email || !password || !confirmedPassword) {
      return;
    }
    const nuevosDatos = {
      "name": name.charAt(0).toUpperCase()+name.slice(1),
      "lastname": surname.charAt(0).toUpperCase()+surname.slice(1),
      "email": email,
      "password": password
    }
    await crearCuenta(nuevosDatos)
    
    navigate("/login")
    
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col p-6 w-[90vw] lg:h-[95vh] lg:w-[40vw] bg-white rounded-xl">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <FormTitle title='Crear una cuenta'></FormTitle>
            <SubTitle subtitle='¡Bienvenido! 👋'></SubTitle>
          </div>
          <div>
            <form action="" className="flex flex-col gap-3" onSubmit={registerUser}>
              <div className="flex flex-row gap-1 w-full">
                <div className="flex flex-col gap-1 w-[50%]">
                  <label>Nombre</label>
                  <input
                    className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
                    type="text"
                    placeholder="Ingrese nombre..."
                    onChange={handleSetName}
                    value={name}
                  />
                </div>
                <div className="flex flex-col gap-1 w-[50%]">
                  <label>Apellido</label>
                  <input
                    className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
                    type="text"
                    placeholder="Ingrese apellido..."
                    onChange={handleSetSurname}
                    value={surname}
                  />
                </div>
              </div>
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
                <div className={`flex flex-row border ${passwordError ? 'border-red-600' : 'border-[#e9e9ef]'} justify-between items-center w-full px-2 shadow-sm rounded-md `}>
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
              <div className="flex flex-col gap-1">
                <label>Confirmar contraseña</label>
                <div className={`flex flex-row border ${confirmedPasswordError ? 'border-red-600' : 'border-[#e9e9ef]'} justify-between items-center w-full px-2 shadow-sm rounded-md`}>
                  <input
                    className="py-3 text-sm outline-none w-full"
                    type={viewPassword ? "text" : "password"}
                    placeholder="Reingrese contraseña..."
                    onChange={handleSetConfirmedPassword}
                    value={confirmedPassword}
                  />
                  <button onClick={handleViewPassword}>
                    {viewPassword ? <Eye /> : <EyeSlash />}
                  </button>
                </div>
                {confirmedPasswordError && <p className="text-red-600 text-sm">{confirmedPasswordError}</p>}
              </div>
              <button className="bg-brandblue text-white p-2 rounded-md hover:opacity-85">Registrarse</button>
              <Link to="/login" className="bg-white text-center text-brandblue border border-brandblue p-2 rounded-md">Ya tengo una cuenta</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
