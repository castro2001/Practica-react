interface INavItemProps{
    navItems: INavItem[] ;
  sidebarOpen: boolean;
}

interface INavItem{
    redirect?:string;
    icon:React.ReactNode;
    className?:string;
    clasNameText?:string
    text: string;
}