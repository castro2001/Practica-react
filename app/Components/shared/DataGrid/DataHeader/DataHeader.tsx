import { RotateCcw, Settings,Search, Loader2, Plus, Sparkles, Trash, Grid, List } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '~/Components/ui/Modal/Modal';

export const DataHeader = (props: IDataHeader)=> {
  const { title="Titulo por Defecto", 
    btn_text="text",
     isSearch=true, 
     isUpdate=true,
     isBtn=true, 
     isIcon=false,
     icon,
    //  modal,
     terminoBusqueda = '', 
     viewMode='',
     setViewMode,
     isLoading= false, 
     setTerminoBusqueda 
    } = props;
// const {isOpen,setIsOpen,size ="md",contentModal}=modal;

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
     <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 
     backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-6 py-6">
          {/* Header principal */}
          <div className="flex items-center justify-start mb-6 flex-wrap md:justify-between">
            <div className="flex items-center space-x-4 ">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  {isIcon ? icon:<Sparkles className="w-5 h-5 text-white" /> }
                  
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {title}
                </h1>
              </div>
              {isLoading && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">Cargando...</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3 mt-5">
              {/* Botón limpiar con tooltip effect */}
              <button
                onClick={limpiarBusqueda}
                disabled={isLoading}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  isLoading
                    ? 'text-gray-300 cursor-not-allowed bg-gray-100 dark:bg-gray-700'
                    : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-105'
                }`}
              >
                <Trash className="w-5 h-5" />
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Limpiar busqueda
                </div>
              </button>
              
              {/* Botón configuración */}
              <button
                disabled={isLoading}
                onClick={()=> window.location.reload()}
                className={`group relative p-3 rounded-xl transition-all duration-300 ${
                  isLoading
                    ? 'text-gray-300 cursor-not-allowed bg-gray-100 dark:bg-gray-700'
                    : 'text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105'
                }`}
              >
                <RotateCcw className="w-5 h-5" />
                <div className="absolute z-20 top-10 left-1/2 transform cursor-pointer -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Actualizar
                </div>
              </button>
                  {/* Ordenar */}
          

              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                   onClick={() => setViewMode && setViewMode('grid') ||setViewMode && setViewMode('table')   }
                  className={`p-2 rounded ${viewMode === 'grid' ||viewMode === 'table' ? 'bg-white shadow-sm text-blue-800' : ''}`}
                >
                  <Grid className="w-4 h-4 " />
                </button>
                <button
                  onClick={() => setViewMode &&  setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-700' : ''}`}
                >
                  <List className="w-4 h-4 " />
                </button>
              </div>
              {/* Botón principal con gradiente */}
              {
                isBtn && (
                    <button
                      disabled={isLoading}
                      className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg ${
                        isLoading
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl hover:scale-105 transform'
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                      <span>{btn_text}</span>
                    </button>
                )
              }
             
            </div>
          </div>
    
          {/* Barra de búsqueda moderna */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 transition-colors duration-200 ${
                isLoading ? 'text-gray-300' : 'text-gray-400 group-focus-within:text-blue-500'
              }`} />
            </div>
            <input
              type="text"
              value={terminoBusqueda}
              onChange={manejarBusqueda}
              disabled={isLoading}
              placeholder={isLoading ? "Cargando..." : "Buscar..."}
              className={`group block w-full pl-12 pr-4 py-3 border-2 rounded-xl leading-5 placeholder-gray-400 transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-gray-500 border-gray-200 dark:border-gray-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm hover:shadow-md'
              }`}
            />
          </div>
        </div>
      </div>
      

    </>
  );
}