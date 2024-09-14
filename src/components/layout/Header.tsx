import { Drawer } from 'antd'
import { HambergerMenu } from 'iconsax-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "src/assets/logo.png"
import HeaderRight from './components/HeaderRight'

const Links = [
    { title: "Markets", href: "/" },
    { title: "Trade", href: "/" },
    { title: "Derivatives", href: "/" },
    { title: "More", href: "/" },
]
const Header = () => {
    const [drawerIsOpen, setDrawerOpen] = React.useState(false)

    const handleMenuDrawer = () => {
        setDrawerOpen(prev => !prev)
    }


    return (
        <>
            <header className='flex justify-between items-center px-6'>
                <div className="flex gap-2">
                    <NavLink to="/" className="w-[134px]">
                        <img src={Logo} alt="logo" />
                    </NavLink>
                    <ul className="flex items-center max-sm:hidden text-primary dark:text-white">
                        {Links.map((link, index) => (
                            <NavLink key={index} to={link.href} className="px-2">{link.title}</NavLink>
                        ))}
                    </ul>
                </div>
                <div className="max-sm:hidden">
                    <HeaderRight isDrawerOpen={drawerIsOpen} />
                </div>
                <div className="sm:hidden">
                    <button onClick={handleMenuDrawer}><HambergerMenu size="32" /></button>
                </div>
            </header>
            <Drawer onClose={handleMenuDrawer} open={drawerIsOpen} styles={{ header: { direction: "rtl" } }}
                rootClassName='max-sm:[&>.ant-drawer-content-wrapper]:!w-full !z-50' className='!bg-white dark:!bg-primary'>
                <HeaderRight isDrawerOpen={drawerIsOpen} />
                <ul className="flex flex-col text-primary dark:text-white gap-4">
                    {Links.map((link, index) => (
                        <NavLink key={index} to={link.href}>{link.title}</NavLink>
                    ))}
                </ul>
            </Drawer>
        </>
    )
}

export default Header