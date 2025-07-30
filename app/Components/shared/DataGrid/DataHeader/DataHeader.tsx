import { RotateCcw, Settings,Search } from 'lucide-react';
import React, { useState } from 'react';

export const DataHeader = (props: IDataHeader)=> {
  const {title="Titulo por Defecto",btn_text,isSearch,isUpdate,   terminoBusqueda = '',
    setTerminoBusqueda} = props;

      const manejarBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setTerminoBusqueda) {
          setTerminoBusqueda(e.target.value);
        }
      };
    
      const limpiarBusqueda = () => {
        if (setTerminoBusqueda) {
          setTerminoBusqueda('');
        }
      };
  return (
    <>
 <header className="px-5 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        <div className="flex items-center space-x-3">
          <button 
            onClick={limpiarBusqueda}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
            <span>{btn_text}</span>
          </button>
        </div>
      </div>
      
      {/* Barra de búsqueda */}
      {isSearch && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={terminoBusqueda}
            onChange={manejarBusqueda}
            placeholder="Buscar productos..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white  dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
    </header>
    
    </>
  );
}