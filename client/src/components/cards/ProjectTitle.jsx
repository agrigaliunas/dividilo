import React from 'react'

export const ProjectTitle = ({project}) => {
  return (
    <div className="flex flex-col gap-3 border border-1 bg-white p-5 rounded-xl shadow-md">
        <div className="flex flex-row w-fit lg:justify-between gap-5">
          {project.state === "En progreso" ? (
            <span className="font-semibold flex items-center justify-center text-center lg:p-3 p-1.5 bg-orange-600 bg-opacity-40 rounded-xl text-gray-800 cursor-default select-none text-xs lg:text-sm">
              {project.state}
            </span>
          ) : (
            <span className="font-semibold flex items-center justify-center text-center lg:p-3 p-1.5 bg-green-600 bg-opacity-40 rounded-xl text-gray-800 cursor-default select-none text-xs lg:text-sm">
              {project.state}
            </span>
          )}
        </div>
        <h1 className="lg:text-4xl text-xl text-left font-extrabold">
          {project.title}
        </h1>
        <span className="text-gray-500 font-medium">
          {project.description}
        </span>
      </div>
  )
}
