import { React, useState } from "react";
import { addTicket } from "../../services/TicketService";
import { useAuth } from "../../contexts/AuthContext";

const NewTicketModal = ({ expenseId, isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState(null);

  const { user } = useAuth();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddTicket = async () => {
    if (description && amount > 0 && date) {
      const formData = new FormData();
      if (image) {
        formData.append("file", image);
      }
      const newTicket = await addTicket(
        expenseId,
        description,
        amount,
        date,
        formData,
        user.token
      );
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[30vw]">
        <h2 className="text-2xl font-semibold mb-4">Agregar ticket</h2>
        <form onSubmit={handleAddTicket} className="flex flex-col gap-4">
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
            placeholder="Ingrese el título del ticket..."
          />
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
            placeholder="Monto del ticket"
            min="0.01"
            step="0.01"
          />
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!description || amount <= 0 || !date}
              className={`bg-brandblue text-white px-4 py-2 rounded-md hover:opacity-85`}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicketModal;
