import React from 'react'
import { MyAccountSectionForm } from '../MyAccountSectionForm'


export const MyAccountSection = ({ section, clearForm }) => {
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <span className='font-bold text-xl'>{section?.title}</span>
                {section?.labels.map(l => (
                    <MyAccountSectionForm label={l} button={section?.button} clearForm={clearForm} // Pasa la señal de limpieza al formulario
                    ></MyAccountSectionForm>
                ))}

            </div>
            <button className={`${section.buttonColor} text-white p-2 rounded-md hover:opacity-85`}>{section?.button}</button>
        </div>
    )
}
