import { Link, NavLink } from "react-router"
import BackgroundDefault from "~/assets/image/background_default.png"
import {HomeIcon,MoonStar, Package, User} from "lucide-react"
import { NavItemLinks } from "~/Components/NavItemLinks/NavItemLinks"
export const SideBar = ()=>{
     const link: INavItem[] = [
        {
            redirect: "/",
            icon: <HomeIcon className="sidebar-icon" />,
            text: "Home",
            className: "sidebar-item",
            clasNameText: "sidebar-text"
        },
        {
            redirect: "/Usuarios",
            icon: <User className="sidebar-icon" />,
            text: "Usuario",
            className: "sidebar-item",
            clasNameText: "sidebar-text"
        },
        {
            redirect: "/Productos",
            icon: <Package className="sidebar-icon" />,
            text: "Productos",
            className: "sidebar-item",
            clasNameText: "sidebar-text"
        },
    ];

    const navItemsProps: INavItemProps = { navItems: link }; 

    return(
        <>
      <aside  className="sidebar">
        <header className="sidebar-header">
            <img src={BackgroundDefault} alt="Logo App" 
            className="w-10 h-10 rounded-lg mr-3 transition-all duration-300 ease-in-out sidebar-logo"/>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out sidebar-title">ChatPro</h1>
    
        </header>
        <nav className="sidebar-nav scrollbar-custom">
           <NavItemLinks navItems={link}/>
        </nav>

    </aside>

        </>
    )
}
{/* 
        <nav className="sidebar-nav scrollbar-custom">
            <a href="#" className="sidebar-item">
                <svg className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0v-4a1 1 0 011-1h2a1 1 0 011 1v4m-6 0h6"></path>
                </svg>
                <span className="sidebar-text">Inicio</span>
            </a>
            <a href="#" className="sidebar-item-active">
                <svg className="sidebar-icon text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
                <span className="sidebar-text">Mensajes</span>
            </a>
            <a href="#" className="sidebar-item">
                <svg className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M17 20v-2c0-.653-.105-1.294-.306-1.898M2 10a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8zm8-2a4 4 0 100-8 4 4 0 000 8zm0 0v10"></path>
                </svg>
                <span className="sidebar-text">Contactos</span>
            </a>
            <a href="#" className="sidebar-item">
                <svg className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
                <span className="sidebar-text">Archivo</span>
            </a>
            <a href="#" className="sidebar-item">
                <svg className="sidebar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37h.003zM12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                </svg>
                <span className="sidebar-text">Configuración</span>
            </a>
        </nav> */}