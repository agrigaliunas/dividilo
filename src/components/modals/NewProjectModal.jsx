import React from 'react'
import { X } from "../icons/X";
 

export const NewProjectModal = ({children, closeModal}) => {
  return (
    <div
      id="modal-overlay"
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="relative bg-white rounded-lg p-5 w-[90%] sm:w-[80%]">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  )
}
