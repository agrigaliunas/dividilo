import React, { useState } from "react";

const NewParticipantModal = ({ isOpen, onClose, onAddParticipant }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      onAddParticipant(email);
      onClose();
    } else {
      setError("Por favor, ingrese un correo electrónico válido.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[30vw]">
        <h2 className="text-2xl font-semibold mb-4">Agregar participante</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
            placeholder="Ingrese el correo electrónico..."
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-brandblue text-white px-4 py-2 rounded-md hover:opacity-85"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewParticipantModal;
