import { useState } from "react";

export const NewTicketModal = ({
  isOpen,
  onClose,
  onAddTicket,
  participantes,
  getParticipanteNombreApellido,
}) => {
  const [descripcionNuevoTicket, setDescripcionNuevoTicket] = useState("");
  const [montos, setMontos] = useState(
    participantes.reduce((acc, participante) => {
      acc[participante.id] = 0;
      return acc;
    }, {})
  );

  const totalTicket = Object.values(montos).reduce((acc, monto) => acc + parseFloat(monto || 0), 0);

  const handleMontoChange = (participanteId, nuevoMonto) => {
    setMontos((prevMontos) => ({
      ...prevMontos,
      [participanteId]: nuevoMonto,
    }));
  };

  const resetForm = () => {
    setDescripcionNuevoTicket("");
    setMontos(
      participantes.reduce((acc, participante) => {
        acc[participante.id] = 0;
        return acc;
      }, {})
    );
  };

  const handleAddTicket = () => {
    const split = participantes.map((p) => {
      const montoParticipante = parseFloat(montos[p] || 0);
      const porcentaje = (montoParticipante / totalTicket) * 100;
      return {
        participanteId: p,
        porcentaje,
        montoParticipante,
      };
    });

    const nuevoTicket = {
      id: "9999",
      descripcion: descripcionNuevoTicket,
      montoTotalTicket: totalTicket,
      fecha: new Date().toJSON().slice(0, 10),
      imagen: "",
      split,
    };

    onAddTicket(nuevoTicket);
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[30vw]">
        <h2 className="text-2xl font-semibold mb-4">Agregar ticket</h2>
        <form onSubmit={handleAddTicket} className="flex flex-col gap-4">
          <input
            type="text"
            value={descripcionNuevoTicket}
            onChange={(e) => setDescripcionNuevoTicket(e.target.value)}
            className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
            placeholder="Ingrese la descripción del ticket..."
          />
          <div className="flex flex-col gap-2 justify-center">
            {participantes.map((p) => {
              const montoParticipante = parseFloat(montos[p] || 0);
              const porcentaje = totalTicket ? (montoParticipante / totalTicket) * 100 : 0;
              return (
                <div key={p} className="flex flex-row gap-1 justify-between">
                  <span className="text-xl">
                    {getParticipanteNombreApellido(p)}
                  </span>
                  <div className="flex items-center">
                    <span className="font-semibold text-xl">paga $</span>
                    <input
                      type="number"
                      value={montos[p] || ""}
                      onChange={(e) => handleMontoChange(p, e.target.value)}
                      className="p-1 border-b border-black border-dashed border-spacing-2 w-20"
                      placeholder="0.00"
                    />
                    <span className="text-red-500 ml-2">{porcentaje.toFixed(2)}%</span>
                  </div>
                </div>
              );
            })}
            <span className="text-2xl font-bold">Total: $ {totalTicket.toFixed(2)}</span>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              disabled={!descripcionNuevoTicket}
              type="submit"
              className={` ${!descripcionNuevoTicket ? "bg-gray-400" : "bg-brandblue"} text-white px-4 py-2 rounded-md hover:opacity-85`}
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
