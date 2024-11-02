import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPasswordLayout = () => {
  return (
    <div className='flex flex-col gap-2 px-5'>
        <span className='font-bold lg:text-5xl text-3xl'>Te enviamos un email para que reestablezcas tu contraseña.</span>
        <span className='lg:text-2xl text-xl text-gray-500'>Recuerda revisar el correo no deseado o spam.</span>
        <Link to="/home" className='text-brandblue underline hover:opacity-80'>Regresar al inicio</Link>
    </div>
  )
}

export default ForgotPasswordLayout