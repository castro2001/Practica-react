import { HomeIcon, MoonStar, Package, User } from "lucide-react"

export const link: INavItem[] = [
    {
        redirect: "/",
        icon: <HomeIcon className="sidebar-icon" />,
        text: "Home",
        className: "sidebar-item flex items-center py-3 px-4 rounded-lg mx-2 mb-2 transition-colors duration-200 ease-in-out",
        clasNameText: "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out"
    },
    {
        redirect: "/Usuarios",
        icon: <User className="sidebar-icon" />,
        text: "Usuario",
        className: "sidebar-item flex items-center py-3 px-4 rounded-lg mx-2 mb-2 transition-colors duration-200 ease-in-out",
        clasNameText: "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out"
    },
    {
        redirect: "/Productos",
        icon: <Package className="sidebar-icon" />,
        text: "Productos",
        className: "sidebar-item flex items-center py-3 px-4 rounded-lg mx-2 mb-2 transition-colors duration-200 ease-in-out",
        clasNameText: "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out"
    },
];