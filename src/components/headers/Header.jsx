import React from 'react'
import { BurgerMenu } from '../icons/BurgerMenu'
import { useMenu } from '../../contexts/MenuContext'

export const Header = () => {

    const { toggleMenu } = useMenu();

    const handleOpenMenu = () => {
        toggleMenu()
    } 


    return (
        <header className='flex justify-start p-5'>
            <button onClick={handleOpenMenu}>
                <BurgerMenu />
            </button>
        </header>
    )
}
