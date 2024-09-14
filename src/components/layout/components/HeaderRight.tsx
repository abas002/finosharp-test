import { Button } from 'antd';
import classNames from 'classnames';
import { Moon, Sun1 } from 'iconsax-react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useTheme } from 'src/contexts/ThemeContext';


interface IProps {
    isDrawerOpen: boolean
}
const HeaderRight: React.FC<IProps> = (props) => {
    const { theme, toggleTheme } = useTheme()


    const handleDarkMode = () => {
        toggleTheme()
    }

    return (
        <div className={classNames("flex items-center text-primary dark:text-white",
            props.isDrawerOpen && "flex-col",
        )}>
            <div className="w-full grid grid-cols-2 justify-center items-center gap-4">
                <NavLink to="/"><Button type="default" className='w-full'>Log In</Button></NavLink>
                <NavLink to="/"><Button type="primary" className='w-full'>Register</Button></NavLink>
            </div>
            <div className={classNames("flex justify-between items-center", props.isDrawerOpen && "w-full")}>
                <p className={classNames(!props.isDrawerOpen && "hidden")}>Theme</p>
                <button onClick={handleDarkMode} className='p-4'>
                    {theme === "light" ? <Moon size="24" /> : <Sun1 size="24" />}
                </button>
            </div>
        </div>
    )
}

export default HeaderRight