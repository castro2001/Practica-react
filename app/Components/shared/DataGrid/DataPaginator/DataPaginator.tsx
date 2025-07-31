import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export const DataPaginator = (props: IDataPaginator) => {
  const { pagina, paginaActual, setPaginaActual, totalElementos, totalPaginas } = props;

  const cambiarPagina = (numeroPagina: number) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  const irAPaginaAnterior = () => {
    cambiarPagina(paginaActual - 1);
  };

  const irAPaginaSiguiente = () => {
    cambiarPagina(paginaActual + 1);
  };

  // Versión desktop - muestra más páginas
  const generarNumerosPaginasDesktop = () => {
    const numeros = [];
    const maxPaginasVisibles = 5;
    let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

    if (fin - inicio + 1 < maxPaginasVisibles) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      numeros.push(i);
    }
    return numeros;
  };

  // Versión móvil - muestra menos páginas
  const generarNumerosPaginasMovil = () => {
    const numeros = [];
    const maxPaginasVisibles = 3;
    let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

    if (fin - inicio + 1 < maxPaginasVisibles) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      numeros.push(i);
    }
    return numeros;
  };

  const elementoInicio = (paginaActual - 1) * pagina + 1;
  const elementoFin = Math.min(paginaActual * pagina, totalElementos);

  // Función para ir a primera y última página
  const irAPrimeraPagina = () => cambiarPagina(1);
  const irAUltimaPagina = () => cambiarPagina(totalPaginas);

  return (
     <div className="px-6 py-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-blue-50/30 dark:from-gray-800/50 dark:to-blue-900/20">
       {/* VERSIÓN MÓVIL */}
       <div className="block sm:hidden">
         {/* Info de elementos - móvil */}
         <div className="text-xs text-gray-600 dark:text-gray-300 text-center mb-4 font-medium">
           <span className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full shadow-sm">
             {elementoInicio}-{elementoFin} de {totalElementos}
           </span>
         </div>
   
         {/* Controles de paginación móvil */}
         <div className="flex items-center justify-between">
           {/* Botón anterior móvil */}
           {/* <button
             onClick={irAPaginaAnterior}
             disabled={paginaActual === 1}
             className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
               paginaActual === 1
                 ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:scale-105 shadow-md'
             }`}
           >
             <ChevronLeft className="h-4 w-4 mr-1" />
             Atrás
           </button> */}
   
           {/* Centro - páginas móvil */}
           <div className="flex items-center space-x-2">
             {/* Primera página si no está visible */}
             {paginaActual > 2 && (
               <>
                 <button
                   onClick={irAPrimeraPagina}
                   className="px-3 py-2 rounded-lg text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-200 shadow-sm"
                 >
                   1
                 </button>
                 {paginaActual > 3 && (
                   <span className="px-1 text-gray-400 dark:text-gray-500">
                     <MoreHorizontal className="h-3 w-3" />
                   </span>
                 )}
               </>
             )}
   
             {/* Páginas centrales */}
             {generarNumerosPaginasMovil().map((numeroPagina) => (
               <button
                 key={numeroPagina}
                 onClick={() => cambiarPagina(numeroPagina)}
                 className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 min-w-[36px] ${
                   numeroPagina === paginaActual
                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                     : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 hover:scale-105 shadow-sm'
                 }`}
               >
                 {numeroPagina}
               </button>
             ))}
   
             {/* Última página si no está visible */}
             {paginaActual < totalPaginas - 1 && (
               <>
                 {paginaActual < totalPaginas - 2 && (
                   <span className="px-1 text-gray-400 dark:text-gray-500">
                     <MoreHorizontal className="h-3 w-3" />
                   </span>
                 )}
                 <button
                   onClick={irAUltimaPagina}
                   className="px-3 py-2 rounded-lg text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-200 shadow-sm"
                 >
                   {totalPaginas}
                 </button>
               </>
             )}
           </div>
   
           {/* Botón siguiente móvil */}
           {/* <button
             onClick={irAPaginaSiguiente}
             disabled={paginaActual === totalPaginas}
             className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
               paginaActual === totalPaginas
                 ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:scale-105 shadow-md'
             }`}
           >
             Siguiente
             <ChevronRight className="h-4 w-4 ml-1" />
           </button> */}
         </div>
       </div>
   
       {/* VERSIÓN DESKTOP */}
       <div className="hidden sm:flex items-center justify-between">
         {/* Información de elementos - desktop */}
         <div className="text-sm text-gray-700 dark:text-gray-300">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
             <p className="font-medium">
               Mostrando <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md font-bold">{elementoInicio}</span> a{' '}
               <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md font-bold">{elementoFin}</span> de{' '}
               <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-md font-bold">{totalElementos}</span> elementos
             </p>
           </div>
         </div>
   
         {/* Controles de paginación desktop */}
         <div className="flex items-center space-x-3">
           {/* Botón anterior desktop */}
           <button
             onClick={irAPaginaAnterior}
             disabled={paginaActual === 1}
             className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center ${
               paginaActual === 1
                 ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:scale-105 shadow-md'
             }`}
           >
             <ChevronLeft className="h-4 w-4 mr-2" />
             Anterior
           </button>
   
           {/* Números de página desktop */}
           <div className="flex space-x-2">
             {/* Primera página + ... si es necesario */}
             {paginaActual > 3 && (
               <>
                 <button
                   onClick={irAPrimeraPagina}
                   className="px-4 py-3 rounded-xl text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                 >
                   1
                 </button>
                 {paginaActual > 4 && (
                   <span className="px-2 py-3 text-gray-400 dark:text-gray-500 flex items-center">
                     <MoreHorizontal className="h-4 w-4" />
                   </span>
                 )}
               </>
             )}
   
             {/* Páginas centrales */}
             {generarNumerosPaginasDesktop().map((numeroPagina) => (
               <button
                 key={numeroPagina}
                 onClick={() => cambiarPagina(numeroPagina)}
                 className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                   numeroPagina === paginaActual
                     ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 border-2 border-transparent'
                     : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105 shadow-md hover:shadow-lg'
                 }`}
               >
                 {numeroPagina}
               </button>
             ))}
   
             {/* ... + última página si es necesario */}
             {paginaActual < totalPaginas - 2 && (
               <>
                 {paginaActual < totalPaginas - 3 && (
                   <span className="px-2 py-3 text-gray-400 dark:text-gray-500 flex items-center">
                     <MoreHorizontal className="h-4 w-4" />
                   </span>
                 )}
                 <button
                   onClick={irAUltimaPagina}
                   className="px-4 py-3 rounded-xl text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                 >
                   {totalPaginas}
                 </button>
               </>
             )}
           </div>
   
           {/* Botón siguiente desktop */}
           <button
             onClick={irAPaginaSiguiente}
             disabled={paginaActual === totalPaginas}
             className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center ${
               paginaActual === totalPaginas
                 ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:scale-105 shadow-md'
             }`}
           >
             Siguiente
             <ChevronRight className="h-4 w-4 ml-2" />
           </button>
         </div>
       </div>
     </div>
  );
};