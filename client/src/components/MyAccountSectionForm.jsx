import React, { useState, useEffect } from 'react';
import {useAuth} from '../contexts/AuthContext'

export const MyAccountSectionForm = ({ label, clearForm }) => {

  const {user} = useAuth()

  const [placeHolder, setPlaceHolder] = useState("")
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const checkPlaceholder = () => {
    switch(label.title) {
      case "Nombre":
        setPlaceHolder(user.nombre)
        break;
      case "Apellido": 
        setPlaceHolder(user.apellido)
        break;
      case "Correo electrónico":
        setPlaceHolder(user.email)
        break;
      case "Contraseña actual":
        setPlaceHolder("******")
        break;
      case "Nueva contraseña":
        setPlaceHolder("Ingresar nueva contraseña")
        break;
      case "Repetir nueva contraseña":
        setPlaceHolder("Repetir nueva contraseña")
        break;
      case "¡Atención! ¡Esta acción no tiene vuelta atrás!":
        setPlaceHolder("Ingrese contraseña para eliminar la cuenta...")
        break;
    }
  }

  useEffect(() => {
    checkPlaceholder()
    if (clearForm) {
      setInputValue('');
    }
  }, [clearForm]);

  return (
    <div className="flex flex-col gap-1">
      <label className='text-md'>{label.title}</label>
      <input
        className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
        type={label.type}
        placeholder={placeHolder}
        value={inputValue}
        onChange={handleChange}
      />
      
    </div>
  );
};
