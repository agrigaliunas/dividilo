import { useState } from "react";
import { addExpense } from "../../services/ExpenseService";

export const NewGastoModal = ({ projectId, gastos, isOpen, onClose, onAddGasto }) => {

    const [descripcionNuevoGasto, setDescripcionNuevoGasto] = useState("");

    const handleDescriptionChange = (e) => {
        const descripcion = e.target.value;
        setDescripcionNuevoGasto(descripcion);
    }


    const handleAddGasto = async () => {
        const nuevoGasto = await addExpense(projectId, descripcionNuevoGasto)
        onAddGasto(nuevoGasto)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] lg:w-[30vw]">
                <h2 className="text-2xl font-semibold mb-4">Agregar gasto</h2>
                <form onSubmit={handleAddGasto} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={descripcionNuevoGasto}
                        onChange={handleDescriptionChange}
                        className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
                        placeholder="Ingrese la descripción del gasto..."
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

export default NewGastoModal;
