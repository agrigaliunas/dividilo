import React from 'react'
import { MyAccountSectionForm } from '../MyAccountSectionForm'


export const MyAccountSection = ({ section }) => {
    return (
        <>
            <span>{section.title}</span>
            {section.labels.map(l => (
                <MyAccountSectionForm label={l} button={section.button}></MyAccountSectionForm>
            ))}
        </>
    )
}
