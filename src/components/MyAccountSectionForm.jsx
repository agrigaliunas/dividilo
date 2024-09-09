import React from 'react'

export const MyAccountSectionForm = ({label}) => {
  return (
    <div className="flex flex-col gap-1">
    <label>{label}</label>
    <input
      className="px-2 py-3 border border-1 border-[#e9e9ef] shadow-sm outline-none rounded-md text-sm"
      type="email"
      placeholder="Ingrese correo electrónico..."
    />
  </div>
  )
}
