import React from 'react';

export const ProjectCard = ({ project }) => {
    return (
        <div className='border border-1 rounded-lg p-3 min-w-[20vw] max-w-[20vw] shadow-md flex flex-col items-center'>
            <div>
                <div className='text-2xl text-center'>{project.nombre}</div>
                <div className='text-sm text-center p-2'>{project.descripcion}</div>
            </div>
            <div className=''>
                <div className='border border-1 rounded-md h-fit w-fit'>
                    <div className='text-xl text-center p-2 font-bold'>${project.montoTotal}</div>
                </div>
            </div>
        </div>
    );
}
