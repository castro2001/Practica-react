import AdminLogo from "~/assets/image/AdminLogo.png"
import { HomeIcon, MoonStar, Package, ShoppingBag, User } from "lucide-react"
import { NavItemLinks } from "~/Components/Layout/NavItemLinks/NavItemLinks"
// import {link} from "~/data/menu";
import { useLocation } from "react-router";
import { useAuth } from '~/context/Auth/authContext'; 

export const SideBar = (props: IActionSideBar) => {
    const location = useLocation();
  const { user } = useAuth();

  const icono = user?.role === "admin" && <User className="sidebar-icon" />


    const { sidebarOpen, setSidebarOpen } = props;
     const redirectToRoles = (redirectAdmin:string,redirectCustomer:string)=>{
        return user?.role ==="admin"&& redirectAdmin || user?.role ==="customer"&& redirectCustomer
    }
    const link: INavItem[] = [
    {
        redirect: "/",
        icon: <HomeIcon className="sidebar-icon" />,
        text: "Home",
        className: "sidebar-item flex items-center py-3 px-4 rounded-lg mx-2 mb-2 transition-colors duration-200 ease-in-out",
        clasNameText: "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out",
        roles: ["customer","admin"]
        },
        {
        redirect: `${redirectToRoles("/dashboard/Productos","/Productos")}`,
        icon: <ShoppingBag className="sidebar-icon" />,
        text: "Tienda Productos",
        className: "sidebar-item flex items-center py-3 px-4 rounded-lg mx-2 mb-2 transition-colors duration-200 ease-in-out",
        clasNameText: "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out",
        roles: ["admin","customer"]
        },
        {
        redirect:  `${redirectToRoles("dashboard/Usuarios","")}`,
        icon: icono,
        text:  `${user?.role === "admin" && "Usuario"}`,
        className: "sidebar-item flex items-center py-3 px-4 rounded-lg mx-2 mb-2 transition-colors duration-200 ease-in-out",
        clasNameText: "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out",
        roles: ["admin"]
        },
//         {
//    redirect:  `MisProductos`,
//         icon: < Package className="sidebar-icon"/>,
//         text:  `Mis Productos`,
//         className: "sidebar-item flex items-center py-3 px-4 rounded-lg mx-2 mb-2 transition-colors duration-200 ease-in-out",
//         clasNameText: "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out",
//         roles: ["customer"]
//         }

    ];
    

   const filteredMenuItems = link.filter((item) =>
        item.roles.includes(user?.role ?? "")
    );


    return (
        <>
        <aside
            className={`bg-white dark:bg-gray-800 bg-gradient-to-br overflow-hidden min-h-screen flex-shrink-0 fixed z-20 transition-all duration-300 ease-in-out group ${
                sidebarOpen ? "w-64" : "w-16"
            }`}
            onMouseEnter={() => !sidebarOpen && setSidebarOpen(true)}
            onMouseLeave={() => sidebarOpen && setSidebarOpen(false)}
        >
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <img 
                    src={AdminLogo} 
                    alt="Logo App"
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                />
                <h1 
                    className={`text-xl font-bold text-gray-900 dark:text-gray-100 ml-3 transition-all duration-300 ease-in-out ${
                        !sidebarOpen 
                            ? "opacity-0 w-0 overflow-hidden" 
                            : "opacity-100"
                    }`}
                >
                    ChatPro
                </h1>
            </header>
            
            <nav className="flex-1 py-4  scrollbar-custom">
                <NavItemLinks navItems={filteredMenuItems} sidebarOpen={sidebarOpen} />
            </nav>
        </aside>
        </>
    )
}