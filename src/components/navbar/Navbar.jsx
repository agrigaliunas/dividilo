import React from 'react';
import { useMenu } from '../../contexts/MenuContext';
import { Cross } from '../icons/Cross';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const { isMenuOpen, closeMenu } = useMenu();

    return (
        <nav
            className={`z-50 w-[80vw] lg:w-[20vw] h-full shadow-md border border-gray-100 rounded-r-xl fixed bg-white top-0 left-0 transition-transform duration-300 ease-in-out 
            transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full pointer-events-none'}`}
        >
            <div className='flex h-full relative py-24'>
                <button
                    onClick={closeMenu}
                    className='absolute top-4 right-4 text-xl font-bold hover:opacity-70'
                >
                    <Cross />
                </button>

                <div className='flex flex-col text-2xl text-left gap-4 w-full px-3'>
                    <Link className='hover:bg-gray-100 w-full py-1 rounded-md px-4' onClick={closeMenu}>Inicio</Link>
                    <Link to = "/dashboard" className='hover:bg-gray-100 w-full py-1 rounded-md px-4' onClick={closeMenu}>Mis proyectos</Link>
                    <Link to = '/account' className='hover:bg-gray-100 w-full py-1 rounded-md px-4' onClick={closeMenu}>Mi perfil</Link>
                    <Link className='hover:bg-gray-100 w-full py-1 rounded-md px-4' onClick={closeMenu}>Ayuda</Link>
                    <Link className='hover:bg-gray-100 w-full py-1 rounded-md px-4' onClick={closeMenu}>Cerrar sesión</Link>
                </div>
            </div>
        </nav>
    );
}
