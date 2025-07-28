import { useState,useEffect } from "react";

import { Menu, Moon, Sun} from "lucide-react"
import BackgroundDefault from "~/assets/image/background_default.png"
import { ModalNotificaciones } from "~/Components/ModalNotificaciones/ModalNotificaciones";


export const Header = ()=>{
const [theme,setTheme] = useState('light');

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
                <button className="">
                <Menu className="h-6 w-6 cursor-pointer" />
                </button>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ml-3">Bandeja de Entrada</h2>
            </div>

            <div className="flex items-center gap-2 space-x-3">
             
                <div className="relative" id="notificationsDropdown">
                    <button id="notificationsToggle" className="btn-ghost btn-icon relative" aria-label="Notificaciones">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.055-.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                        </svg>
                        <span id="notificationCount" className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                    </button>
                    
                    <div id="notificationsPanel" className="notification-panel hidden">
                        <div className="notification-header">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Notificaciones</h3>
                            <button id="closeNotifications" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <div id="notificationsList">
                            <div className="notification-item">
                                <div className="notification-title">Nuevo mensaje recibido</div>
                                <div className="notification-content">Juan Pérez te ha enviado un mensaje</div>
                                <div className="notification-time">Hace 5 minutos</div>
                            </div>
                            <div className="notification-item">
                                <div className="notification-title">Mensaje enviado</div>
                                <div className="notification-content">Tu mensaje ha sido entregado correctamente</div>
                                <div className="notification-time">Hace 1 hora</div>
                            </div>
                            <div className="notification-item">
                                <div className="notification-title">Recordatorio</div>
                                <div className="notification-content">Tienes 2 mensajes sin leer</div>
                                <div className="notification-time">Hace 2 horas</div>
                            </div>
                        </div>
                        
                        <div className="text-center p-2 border-t border-gray-200 dark:border-gray-700">
                            <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">Ver todas las notificaciones</a>
                        </div>
                    </div>
                </div>

            
                <button className="btn-ghost btn-icon relative" aria-label="Mensajes">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-100 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">2</span>
                </button>


             <button  onClick={toggleTheme} type="button" aria-label="Color Mode" className="btn-ghost btn-icon cursor-pointer">
              {
              theme =="dark" ? 
              <Moon className="w-6 h-6 transform"/> : 
              <Sun className="w-5 h-5 transform-rotate-90 text-black"/>
              }
            </button>

                <div className="relative" id="userMenuDropdown">
                    <button id="userMenuToggle" className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                        <img className="h-10 w-10 rounded-full object-cover" src={BackgroundDefault} alt="User Avatar"/>
                    </button>
                    <div id="userMenuPanel" className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-40 hidden">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Mi Perfil</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Configuración</a>
                        <div className="border-t border-gray-100 dark:border-gray-700"></div>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Cerrar Sesión</a>
                    </div>
                </div>
            </div>
    
           
    
        </header>

        <ModalNotificaciones/>
        </>
    )
}