import React from "react";
import { MyAccountSectionForm } from "../MyAccountSectionForm";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { eliminarUsuario } from "../../services/UserService";

export const MyAccountSection = ({ section, clearForm }) => {

  const navigate = useNavigate();
  const {token, user} = useAuth()

  const deleteAccount = async () => {
    await eliminarUsuario(user.user_id, token);
    navigate("/home")
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="font-bold text-xl">{section?.title}</span>
        {section?.labels.map((l) => (
          <MyAccountSectionForm
            label={l}
            button={section?.button}
            clearForm={clearForm}
          ></MyAccountSectionForm>
        ))}
      </div>
      {section.step === 2 ? (
        <button
          onClick={deleteAccount}
          className={` ${section.buttonColor} text-white p-2 rounded-md hover:opacity-85`}
        >
          {section?.button}
        </button>
      ) : (
        <button
          onClick={() =>
            alert("Se ha actualizado la informacion correctamente.")
          }
          className={` ${section.buttonColor} text-white p-2 rounded-md hover:opacity-85`}
        >
          {section?.button}
        </button>
      )}
    </div>
  );
};
