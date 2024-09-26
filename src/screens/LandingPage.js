import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

const LandingPage = () => {
  const { user } = useAuth();

  {
    return user ? (
      <Navigate to="/dashboard" />
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
        <div className="w-full max-w-6xl mx-auto text-center flex flex-col gap-5 items-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">Dividilo</h1>
          <p className="text-xl text-gray-600">
            Organizá tus proyectos, dividí gastos y mantené a todos al tanto de
            cuánto deben.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white py-3 px-6 rounded-full lg:w-[50%] w-[70%] text-center shadow-lg hover:bg-blue-700"
          >
            Comenzá a Organizar
          </Link>
        </div>

        <section className="w-full max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
            ¿Cómo Funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">1. Creá Proyectos</h3>
              <p className="text-gray-600">
                Definí los detalles del proyecto como nombre, descripción y
                monto total.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">2. Añadí Gastos</h3>
              <p className="text-gray-600">
                Agregá los gastos con sus tickets correspondientes y especificá
                cómo se dividen entre los participantes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-4">3. Compartí y Gestioná</h3>
              <p className="text-gray-600">
                Compartí el proyecto con otros participantes y permití que vean
                sus deudas y contribuciones.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto mt-20">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <img
                src="https://via.placeholder.com/150"
                alt="Icono de proyecto"
                className="w-16 h-16 mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">Gestión de Proyectos</h3>
                <p className="text-gray-600">
                  Mantené un control total de los proyectos, desde su creación
                  hasta la finalización.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <img
                src="https://via.placeholder.com/150"
                alt="Icono de gastos"
                className="w-16 h-16 mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">División de Gastos</h3>
                <p className="text-gray-600">
                  Dividí los gastos de manera equitativa o personalizada entre
                  los participantes.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <img
                src="https://via.placeholder.com/150"
                alt="Icono de tickets"
                className="w-16 h-16 mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">Tickets con Imágenes</h3>
                <p className="text-gray-600">
                  Subí imágenes de los tickets para mantener un registro claro
                  de los gastos.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <img
                src="https://via.placeholder.com/150"
                alt="Icono de participantes"
                className="w-16 h-16 mr-4"
              />
              <div>
                <h3 className="text-xl font-bold">Gestión de Participantes</h3>
                <p className="text-gray-600">
                  Agregá y gestiona a los participantes en cada proyecto, con
                  acceso a sus deudas y pagos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full max-w-6xl mx-auto text-center py-10 mt-20 border-t">
          <p className="text-gray-600">
            © 2024 Dividilo. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    );
  }
};

export default LandingPage;
