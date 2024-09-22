import React, { useEffect, useState } from "react";

const AdminPanelLayout = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensajeExito, setMensajeExito] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const fetchUsuarios = async () => {
    const response = await fetch("http://localhost:8000/usuarios");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchUsuarios().then(setUsuarios);
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.id !== id)
        );
        setMensajeExito("Usuario eliminado con éxito.");
        setTimeout(() => setMensajeExito(""), 3000);
      } else {
        console.error("Error al eliminar el usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  const restorePassword = async (id) => {
    try {
      const usuarioOriginal = usuarios.find((usuario) => usuario.id === id);

      const datosActualizados = {
        ...usuarioOriginal,
        password: "123456",
      };

      const response = await fetch(`http://localhost:8000/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      });

      if (response.ok) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === id ? { ...usuario, password: "123456" } : usuario
          )
        );
        setMensajeExito("Contraseña reestablecida con éxito a '123456'.");
        setTimeout(() => setMensajeExito(""), 3000);
        setUsuarioEditando(null);
      } else {
        console.error("Error al restablecer la contraseña.");
      }
    } catch (error) {
      console.error(
        "Error en la solicitud de restablecimiento de contraseña:",
        error
      );
    }
  };

  const actualizarUsuario = async (usuarioActualizado) => {
    try {
      const response = await fetch(
        `http://localhost:8000/usuarios/${usuarioActualizado.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuarioActualizado),
        }
      );

      if (response.ok) {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario
          )
        );
        setMensajeExito("Usuario actualizado con éxito.");
        setTimeout(() => setMensajeExito(""), 3000);
        setUsuarioEditando(null);
      } else {
        console.error("Error al actualizar el usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  };

  const handleEditarClick = (usuario) => {
    setUsuarioEditando(usuario);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditando({ ...usuarioEditando, [name]: value });
  };

  return (
    <>
      {mensajeExito && (
        <div className="absolute w-[50vw] left-[25%] top-[15%] bg-green-100 text-green-700 opacity-80 p-4 rounded-full text-center text-xl">
          {mensajeExito}
        </div>
      )}
      <div className="py-16">
        <div className="bg-white rounded-xl lg:p-4 p-2 flex flex-col gap-2 lg:w-[90vw] w-[95vw]">
          <h2 className="lg:text-2xl text-xl font-semibold">
            Administración de cuentas
          </h2>
          <div>
            <div className="flex flex-col text-xs gap-2 items-center justify-center">
              {usuarios.map((usuario) => (
                <div
                  key={usuario.id}
                  className="shadow-md border border-gray-300 flex flex-col gap-1 rounded-lg justify-center p-3 w-full"
                >
                  {usuarioEditando && usuarioEditando.id === usuario.id ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">Email:</span>
                        <input
                          type="text"
                          name="email"
                          value={usuarioEditando.email}
                          onChange={handleInputChange}
                          className="text-sm border border-gray-300 rounded px-2"
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">Nombre:</span>
                        <input
                          type="text"
                          name="nombre"
                          value={usuarioEditando.nombre}
                          onChange={handleInputChange}
                          className="text-sm border border-gray-300 rounded px-2"
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">Apellido:</span>
                        <input
                          type="text"
                          name="apellido"
                          value={usuarioEditando.apellido}
                          onChange={handleInputChange}
                          className="text-sm border border-gray-300 rounded px-2"
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">
                          Contraseña:
                        </span>
                        <button
                          className="p-1 text-center bg-brandblue text-white rounded"
                          onClick={() => restorePassword(usuarioEditando.id)}
                        >
                          Reestablecer
                        </button>
                      </div>
                      <button
                        onClick={() => actualizarUsuario(usuarioEditando)}
                        className="mt-2 bg-green-500 text-white rounded px-4 py-2 hover:bg-opacity-90"
                      >
                        Guardar cambios
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">Email:</span>
                        <span className="text-sm">{usuario.email}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">Nombre:</span>
                        <span className="text-sm">{usuario.nombre}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">Apellido:</span>
                        <span className="text-sm">{usuario.apellido}</span>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold text-sm">
                          Contraseña:
                        </span>
                        <span className="text-sm">********</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleEditarClick(usuario)}
                          className="mt-2 bg-gray-500 text-white rounded px-4 py-2 hover:bg-opacity-90"
                        >
                          Modificar datos
                        </button>
                        <button
                          onClick={() => eliminarUsuario(usuario.id)}
                          className="mt-2 bg-red-500 text-white rounded px-4 py-2 hover:bg-opacity-90"
                        >
                          Eliminar cuenta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanelLayout;
