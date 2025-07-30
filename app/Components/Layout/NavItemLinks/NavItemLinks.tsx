import { NavLink } from "react-router"
import { MoonStar } from "lucide-react"

export const NavItemLinks = (props: INavItemProps) => {
    const { navItems, sidebarOpen } = props

    return (
        <>
            {navItems.map((items, index) => {
                const {
                    redirect = "/",
                    className = "sidebar-item",
                    icon = <MoonStar className="sidebar-icon" />,
                    text = "texto",
                    clasNameText = "sidebar-text whitespace-nowrap transition-all duration-300 ease-in-out"
                } = items

                return (
                    <NavLink
                        key={index}
                        to={redirect}
                        className={({ isActive }) =>
                            `${className} ${
                                isActive
                                    ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-100 font-semibold"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span
                                    className={`${
                                        isActive
                                            ? "text-blue-600 dark:text-blue-300"
                                            : "text-gray-600 dark:text-gray-300"
                                    }`}
                                >
                                    {icon}
                                </span>
                                <span
                                    className={`${clasNameText} ${
                                        !sidebarOpen
                                            ? "opacity-0 w-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:w-auto group-hover:h-auto group-hover:overflow-visible"
                                            : ""
                                    }`}
                                >
                                    {text}
                                </span>
                            </>
                        )}
                    </NavLink>
                )
            })}
        </>
    )
}