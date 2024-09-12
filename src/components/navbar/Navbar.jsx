import React from 'react';
import { useMenu } from '../../contexts/MenuContext';
import { Cross } from '../icons/Cross';

export const Navbar = () => {
    const { isMenuOpen, closeMenu } = useMenu();

    return (
        <>
            {isMenuOpen && (
                <nav className='w-[80vw] lg:w-[25vw] h-full shadow-sm border border-gray-100 rounded-r-lg absolute bg-white justify-center items-center overflow-hidden'>
                    <div className='flex h-full relative px-8 py-16'>
                        <button
                            onClick={closeMenu}
                            className='absolute top-4 right-4 text-xl font-bold'
                        >
                            <Cross></Cross>
                        </button>

                        <ul className='flex flex-col text-2xl text-left gap-4'>
                            <li>Inicio</li>
                            <li>Mi perfil</li>
                            <li>Ayuda</li>
                            <li>Cerrar sesión</li>
                        </ul>
                    </div>
                </nav>
            )}
        </>
    );
}
