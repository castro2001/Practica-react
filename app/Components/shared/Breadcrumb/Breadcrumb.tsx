import React, { useState, useEffect } from 'react';
import { ChevronRight, Home, ArrowLeft, Clock, User, Package, Settings, MessageCircle, Bell } from 'lucide-react';

interface BreadcrumbItem {
  path: string;
  name: string;
  timestamp: Date;
}

const routeNames: Record<string, string> = {
  '/': 'Inicio',
  '/usuarios': 'Usuarios',
  '/productos': 'Productos',
  '/configuracion': 'Configuración',
  '/perfil': 'Perfil',
  '/mensajes': 'Mensajes',
  '/notificaciones': 'Notificaciones'
};


export const Breadcrumb = () => {
    const [showBackButton, setShowBackButton] = useState(true);
    const showTimestamp = false;
    const currentPath = '/'; // This should be dynamically set based on the current route
      const [visitedPages, setVisitedPages] = useState<BreadcrumbItem[]>([
        { path: '/', name: 'Inicio', timestamp: new Date(Date.now() - 300000) },
        { path: '/usuarios', name: 'Usuarios', timestamp: new Date(Date.now() - 180000) },
        { path: '/productos', name: 'Productos', timestamp: new Date(Date.now() - 60000) },
        { path: currentPath, name: routeNames[currentPath] || 'Página Actual', timestamp: new Date() }
      ]);
      const [showHistory, setShowHistory] = useState(false);
    
      const handleGoBack = () => {
        alert('Navegando hacia atrás...');
      };
    
      const formatTime = (date: Date) => {
        return date.toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      };
    
      const currentPage = visitedPages[visitedPages.length - 1];
      const previousPages = visitedPages.slice(0, -1);
  return (
 <>
  <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
       <div className="flex items-center justify-between">
         {/* Breadcrumb principal */}
         <div className="flex items-center space-x-2 flex-1">
           {/* Botón de retroceso */}
           {showBackButton && visitedPages.length > 1 && (
             <button
               onClick={handleGoBack}
               className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mr-2 group"
               title="Volver a la página anterior"
             >
               <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100" />
             </button>
           )}
 
           {/* Icono de inicio */}
           <button 
             onClick={() => alert('Navegando al inicio...')}
             className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group"
             title="Ir al inicio"
           >
             <Home className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
           </button>
 
           {/* Separador y páginas */}
           {previousPages.length > 0 && (
             <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
           )}
 
           {/* Páginas anteriores */}
           {previousPages.slice(-2).map((item, index) => (
             <React.Fragment key={`${item.path}-${index}`}>
               <button
                 onClick={() => alert(`Navegando a ${item.name}...`)}
                 className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
               >
                 {item.name}
               </button>
               <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
             </React.Fragment>
           ))}
 
           {/* Página actual */}
           {currentPage && (
             <div className="flex items-center space-x-2">
               <span className="px-3 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-md">
                 {currentPage.name}
               </span>
               {showTimestamp && (
                 <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                   <Clock className="w-3 h-3 mr-1" />
                   {formatTime(currentPage.timestamp)}
                 </span>
               )}
             </div>
           )}
         </div>
 
         {/* Botón de historial */}
         {visitedPages.length > 1 && (
           <div className="relative">
             <button
               onClick={() => setShowHistory(!showHistory)}
               className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
               title="Ver historial de navegación"
             >
               <Clock className="w-4 h-4" />
               <span>Historial ({visitedPages.length})</span>
             </button>
 
             {/* Dropdown del historial */}
             {showHistory && (
               <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                 <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                   <h3 className="font-medium text-gray-900 dark:text-gray-100">Páginas Visitadas</h3>
                 </div>
                 <div className="max-h-64 overflow-y-auto">
                   {visitedPages.slice().reverse().map((item, index) => (
                     <button
                       key={`history-${item.path}-${index}`}
                       onClick={() => {
                         alert(`Navegando a ${item.name}...`);
                         setShowHistory(false);
                       }}
                       className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                         index === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                       }`}
                     >
                       <div className="flex-1">
                         <div className="font-medium text-gray-900 dark:text-gray-100">
                           {item.name}
                         </div>
                         <div className="text-sm text-gray-500 dark:text-gray-400">
                           {item.path}
                         </div>
                       </div>
                       <div className="text-xs text-gray-400 dark:text-gray-500 ml-3">
                         {formatTime(item.timestamp)}
                         {index === 0 && (
                           <span className="ml-2 inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                             Actual
                           </span>
                         )}
                       </div>
                     </button>
                   ))}
                 </div>
                
               </div>
             )}
           </div>
         )}
       </div>
 
    
     </div>
 </>
  );
}