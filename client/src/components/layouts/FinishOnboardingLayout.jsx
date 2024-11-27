import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "../icons/Eye";
import { EyeSlash } from "../icons/EyeSlash";
import { useAuth } from "../../contexts/AuthContext";
import { completarOnboarding } from "../../services/UserService";

const FinishOnboardingLayout = ({ pendingUser }) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { user, logout} = useAuth();

  const navigate = useNavigate();

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleViewPassword = (e) => {
    e.preventDefault();
    setViewPassword(!viewPassword);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetSurname = (e) => {
    setSurname(e.target.value);
  };

  const completeOnboarding = async (e) => {
    e.preventDefault();

    const data = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      lastname: surname.charAt(0).toUpperCase() + surname.slice(1),
      password: password,
    };

    const response = await completarOnboarding(user.user_id, data);
    if (response.status === 200) {
        await logout()
        navigate("/login")
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 border border-1 bg-white p-5 rounded-xl shadow-md">
        <h2 className="lg:text-4xl font-bold">
          Parece que todavía no completaste tus datos.
        </h2>
        <h3 className="text-xl font-medium">
          Para poder continuar, por favor completá el siguiente formulario
        </h3>
        <form
          className="flex flex-col gap-3 my-5"
          onSubmit={completeOnboarding}
        >
          <div className="flex flex-col gap-2">
            <label>
              Correo electrónico{" "}
              <span className="text-red-500">
                (podrás editarlo luego de completar tu registro)
              </span>
            </label>
            <input
              disabled={true}
              className={`px-2 py-3 border border-[#e9e9ef]'} shadow-sm outline-none rounded-md text-sm`}
              placeholder={pendingUser.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Nombre</label>
            <input
              required={true}
              onChange={handleSetName}
              value={name}
              className={`px-2 py-3 border border-[#e9e9ef]'} shadow-sm outline-none rounded-md text-sm`}
              placeholder="Ingrese nombre..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Apellido</label>
            <input
              required={true}
              onChange={handleSetSurname}
              value={surname}
              className={`px-2 py-3 border border-[#e9e9ef]'} shadow-sm outline-none rounded-md text-sm`}
              placeholder="Ingrese apellido..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Contraseña nueva</label>
            <div
              className={`flex flex-row border ${
                passwordError ? "border-red-600" : "border-[#e9e9ef]"
              } justify-between items-center w-full`}
            >
              <input
                required={true}
                type={viewPassword ? "text" : "password"}
                onChange={handleSetPassword}
                value={password}
                className="py-3 text-sm outline-none w-full px-2"
                placeholder="Ingrese contraseña..."
              />
              <button onClick={handleViewPassword}>
                {viewPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-600 text-sm">{passwordError}</p>
            )}
          </div>
          <button className="bg-brandblue text-white p-2 rounded-md hover:opacity-85">
            Completar registro
          </button>
        </form>
      </div>
    </>
  );
};

export default FinishOnboardingLayout;
