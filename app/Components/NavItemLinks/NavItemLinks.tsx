import {  NavLink } from "react-router"
import {MoonStar} from "lucide-react"

export const NavItemLinks = (props: INavItemProps)=>{
    const {navItems} = props
 
 return(   
 <>
    {navItems.map((items)=>{
        const {
            redirect="/",
            className = "sidebar-item",
            icon = <MoonStar className="sidebar-icon"/>, 
            text="texto",
            clasNameText="sidebar-text"
        } = items

    return (
        <>
            <NavLink
            to={redirect}
            className={className}
            >
            {icon}
            <span className={clasNameText}> {text}</span>
            </NavLink>

        </>

        )
    })}
    </>
)
}