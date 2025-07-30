import { useState,useEffect } from "react";

import { Menu, Moon, Sun} from "lucide-react"
import BackgroundDefault from "~/assets/image/background_default.png"
import { ModalNotificaciones } from "~/Components/shared/ModalNotificaciones/ModalNotificaciones";
import {mensajesModal,notificationsPanel,panelUser} from "~/mockup/modalNotificaciones";

export const Header = (props: IActionSideBar)=>{
    const { sidebarOpen, setSidebarOpen } = props;

    const [theme,setTheme] = useState('light');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenPanel, setIsOpenPanel] = useState(false);
    const [isOpenPanelUser,setIsOpenPanelUser] = useState(false);

  const modalNotificaciontes: IActionsModal={
    isOpen:isOpenPanel,
    onClose:() => setIsOpenPanel(false),
    modalbody:{
        title:"Notificaciones",
        classNameContainer:"-right-1 w-80 ",
        content:notificationsPanel,
        redirect_Text:"Marcar todo como leído",
        redirect:""
    }        
  }

   const modalMensajes: IActionsModal={
    isOpen:isOpen,
    onClose:() => setIsOpen(false),
    modalbody:{
        title:"Mensajes Recibidos",
        classNameContainer:"-right-20 w-80 ",
        content:mensajesModal,
        redirect_Text:"",
        redirect:""
    }        
  }

  const modalUsuarios: IActionsModal={
    isOpen:isOpenPanelUser,
    onClose:() => setIsOpenPanelUser(false),
    modalbody:{
        title:"Usuarios del Sistema",
        classNameContainer:"-right-0 w-80 ",
        content:panelUser,
        redirect_Text:"",
        redirect:""
    }        
  }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return(
        <>
        <header className="flex-shrink-0 flex items-center justify-between h-16 px-4 shadow-sm bg-white dark:bg-gray-800 relative z-10">
           
            <div className="flex items-center">
                <button className="" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-6 w-6 cursor-pointer text-black dark:text-white" />
                </button>
                {/* <h2 className="text-[10px]  font-semibold text-gray-800 dark:text-gray-100 ml-3">Bandeja de Entrada</h2> */}
            </div>
    <div className="flex items-center gap-2 space-x-3">
    {/* Notificaciones */}
    <div className="relative">
        <button 
            onClick={() => setIsOpenPanel(!isOpenPanel)} 
            className="btn-ghost btn-icon relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
            aria-label="Notificaciones"
        >
            <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                3
            </span>
        </button>
        
        <ModalNotificaciones {...modalNotificaciontes}/>
    </div>

    {/* Mensajes */}
    <div className="relative">
        <button  
            onClick={() => setIsOpen(!isOpen)} 
            className="btn-ghost btn-icon relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
            aria-label="Mensajes"
        >
            <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                2
            </span>
        </button>

        <ModalNotificaciones {...modalMensajes}/> 
    </div>

    {/* Botón de tema */}
    <button  
        onClick={toggleTheme} 
        type="button" 
        aria-label="Color Mode" 
        className="btn-ghost btn-icon cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
        {theme === "dark" ? 
            <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300"/> : 
            <Sun className="w-6 h-6 text-gray-600"/>
        }
    </button>

    {/* Usuario */}
    <div className="relative">
        <button 
            onClick={() => setIsOpenPanelUser(!isOpenPanelUser)} 
            className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
        >
            <img className="h-10 w-10 rounded-full object-cover" src={BackgroundDefault} alt="User Avatar"/>
        </button>
        
         <ModalNotificaciones {...modalUsuarios}       />
    </div>
</div>

        </header>
        </>
    )
}