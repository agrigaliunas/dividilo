import React from 'react'

export const MyAccountSectionTitle = ({section, actualStep, changeStep}) => {
  return (
    <div className={`rounded-xl transition-all ${section.step === actualStep ? 'text-white bg-brandblue hover:bg-gray-100 hover:text-black' : 'bg-gray-100  hover:bg-brandblue hover:text-white'}`}>
        <button className='px-4 py-2' onClick={() => changeStep(section.step)}>{section.title}</button>
    </div>
  )
}
