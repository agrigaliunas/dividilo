import React from 'react'
import { BurgerMenu } from '../icons/BurgerMenu'
import { useMenu } from '../../contexts/MenuContext'

export const Header = () => {

    const { toggleMenu } = useMenu();

    const handleOpenMenu = () => {
        toggleMenu()
    } 


    return (
        <header className='z-10 sticky top-0 p-5'>
            <button onClick={handleOpenMenu} className='rounded-md hover:scale-110 transition-all'>
                <BurgerMenu />
            </button>
        </header>
    )
}
