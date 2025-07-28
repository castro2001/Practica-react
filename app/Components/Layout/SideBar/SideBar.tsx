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