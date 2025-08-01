import AdminLogo from "~/assets/image/AdminLogo.png"
import { HomeIcon, MoonStar, Package, User } from "lucide-react"
import { NavItemLinks } from "~/Components/Layout/NavItemLinks/NavItemLinks"
import {link} from "~/mockup/menu";
export const SideBar = (props: IActionSideBar) => {
    const { sidebarOpen, setSidebarOpen } = props;

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
                <NavItemLinks navItems={link} sidebarOpen={sidebarOpen} />
            </nav>
        </aside>
        </>
    )
}