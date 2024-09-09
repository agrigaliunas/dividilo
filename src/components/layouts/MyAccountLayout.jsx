import React from 'react'
import { MyAccountSection } from '../sections/MyAccountSection';


const sections = [{
  title: "Información personal",
  labels: ["Nombre","Apellido","Email"],
  button: "Actualizar información"
  },
  {
  title: "Seguridad",
  labels: ["Contresña actual","Nueva contraseña","Repetir nueva contraseña"],
  button: "Actualizar contraseña"
  }] 

const MyAccountLayout = () => {
  return (
    <div className="flex flex-col p-6 w-[90vw] h-[80vh] lg:w-[70vw] border border-1 border-[#e9e9ef] rounded-md shadow-sm">
      <h2 className="text-3xl font-semibold text-center">Mi cuenta</h2>
      {sections.map(s => (
          <MyAccountSection section={s}/>
      ))}
    </div>
  )
}

export default MyAccountLayout;