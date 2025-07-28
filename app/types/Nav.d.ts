interface INavItemProps{
    navItems: INavItem[] ;
}

interface INavItem{
    redirect?:string;
    icon:React.ReactNode;
    className?:string;
    clasNameText?:string
    text: string;
}