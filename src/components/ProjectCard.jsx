import React from 'react';
import { ProjectParticipant } from './ProjectParticipant';

export const ProjectCard = ({ project }) => {
    const participants = project.participantes || [];
    const colorsSelected = [];

    const selectColor = (colorsSelected) => {
        const participantColor = ["bg-orange-400", "bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-400"];
        let randomColor;

        do {
            randomColor = participantColor[Math.floor(Math.random() * participantColor.length)];
        } while (colorsSelected.includes(randomColor));

        colorsSelected.push(randomColor);

        return randomColor;
    };

    return (
        <div className='border border-1 rounded-lg p-3 min-w-[12vw] max-w-[12vw] shadow-md flex flex-col '>
            <div className='text-center'>
                <div className='text-2xl'>{project.nombre}</div>
                <div className='text-sm p-2'>{project.descripcion}</div>
            </div>
            <div className='flex flex-col flex-grow justify-end items-center'>
                <div className='border border-1 rounded-md h-fit w-fit'>
                    <div className='text-xl text-center p-2 font-bold'>${project.montoTotal}</div>
                </div>
                <div className='flex flex-row gap-4 py-4'>
                    {participants.map((p) => {
                        const color = selectColor(colorsSelected);
                        return (
                            <ProjectParticipant
                                participant={p}
                                color={color}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
