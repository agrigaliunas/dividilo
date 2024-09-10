import React from 'react'
import { MyAccountSection } from '../sections/MyAccountSection';


const sections = [{
  title: "Información personal",
  labels: [{
    title: "Nombre",
    placeholder: "Ingrese nombre...",
    type: "text"
  },
  {
    title: "Apellido",
    placeholder: "Ingrese apellido...",
    type: "text"
  },
  {
    title: "Email",
    placeholder: "Ingrese email...",
    type: "email"
  }
  ],
  button: "Actualizar información"
},
{
  title: "Seguridad",
  labels: [{
    title: "Contraseña actual",
    placeholder: "Ingrese contraseña actual...",
    type: "password"
  },
  {
    title: "Nueva contraseña",
    placeholder: "Ingrese nueva contraseña...",
    type: "password"
  },
  {
    title: "Repetir nueva contraseña",
    placeholder: "Ingrese nueva contraseña...",
    type: "password"
  }
  ],
  button: "Actualizar contraseña"
}]

const MyAccountLayout = () => {
  return (
    <div className="flex flex-col p-6 w-[90vw] h-[80vh] lg:w-[70vw] border border-1 border-[#e9e9ef] rounded-md shadow-sm">
      <h2 className="text-3xl font-semibold text-center">Mi cuenta</h2>
      <div className='flex flex-col gap-6'>
        {sections.map(s => (
          <MyAccountSection section={s} />
        ))}
      </div>
    </div>
  )
}

export default MyAccountLayout;