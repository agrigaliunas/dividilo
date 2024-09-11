import React from 'react'
import { MyAccountSectionForm } from '../MyAccountSectionForm'


export const MyAccountSection = ({ section }) => {
    return (
        <div className='flex flex-col gap-2'>
            <span className='font-bold text-xl'>{section?.title}</span>
            {section?.labels.map(l => (
                <MyAccountSectionForm label={l} button={section?.button}></MyAccountSectionForm>
            ))}
            <button className="bg-brandblue text-white p-2 rounded-md hover:opacity-85">{section?.button}</button>
        </div>
    )
}
