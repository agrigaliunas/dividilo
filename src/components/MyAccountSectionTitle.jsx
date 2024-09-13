import React from 'react'

export const MyAccountSectionTitle = ({section, actualStep, changeStep}) => {
  return (
    <div className={`rounded-xl content-center transition-all ${section.step === actualStep ? 'text-white bg-brandblue hover:bg-gray-100 hover:text-black' : 'bg-gray-100  hover:bg-brandblue hover:text-white'}`}>
        <button className='flex flex-row px-4 py-2 items-center text-left' onClick={() => changeStep(section.step)}><span className='mr-2'>{section.icon}</span>{section.title}</button>
    </div>
  )
}
