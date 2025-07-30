  import { Clock, MoreHorizontal, Star } from 'lucide-react';
  import React, { useState } from 'react';
  import BackgroundDefault from "~/assets/image/background_default.png"


  export const DataBody = (props: IDataBody<IProduct>) => {
    const { data = [], terminoBusqueda = '', 
      totalElementos = 0,isStarred,isDraft,isArchived,isRead  } = props;
      
      console.log("Obteniendo datos de forma generica con T",data)
    const obtenerMensajeVacio = () => {
      if (terminoBusqueda.trim()) {
        return `No se encontraron resultados para "${terminoBusqueda}".`;
      }
      return 'No hay elementos disponibles.';
    };

    return (
    
       <div className="bg-white dark:bg-gray-800">
         {data && data.length > 0 ? (
           <div className="divide-y divide-gray-100">
             {data.map((product: IProduct) => (
               <div 
                key={product.id} 
                className="py-2 px-4 hover:bg-gray-50 transition-colors duration-150 dark:hover:bg-gray-600 cursor-pointer" 
              >
                {/* DISEÑO PARA DESKTOP (md y superior) */}
                <div className="hidden md:flex items-center space-x-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
                  />
                      <button 
                              // onClick={() => toggleStar(product.id)}
                              className={`transition-colors duration-150 ease-in-out ${
                                isStarred 
                                  ? 'text-yellow-500' 
                                  : 'text-gray-400 hover:text-yellow-500'
                              }`}
                            >
                              <Star className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} />
                            </button>
                  <img
                    alt="Product"
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    src={product.images?.[0] || BackgroundDefault}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = BackgroundDefault;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900 truncate dark:text-gray-50">
                        {product.category?.name || 'General'}
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        NUEVO
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium truncate mb-1 dark:text-gray-50">
                      {product.title}
                    </p>
                    <p className="text-gray-600 text-sm truncate dark:text-gray-50">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
                      ${product.price}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* DISEÑO PARA MÓVIL (sm y inferior) */}
                <div className="md:hidden">
                  {/* Header con checkbox, estrella y menú */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300  focus:ring-blue-500"
                      />
                      <button className="text-gray-400 hover:text-yellow-500 transition-colors duration-150">
                        <Star className="h-4 w-4" />
                      </button>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        NUEVO
                      </span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Contenido principal */}
                  <div className="flex space-x-3">
                    <img
                      alt="Product"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                    src={product.images?.[0] || BackgroundDefault}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = BackgroundDefault;
                    }}
                    />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-1">
                          {product.category?.name || 'General'}
                        </p>
                        <h3 className="text-base font-bold text-gray-900 leading-tight dark:text-gray-100">
                          {product.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 dark:text-gray-50">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xl font-bold text-blue-600 dark:text-gray-50">
                          ${product.price}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-50">
                          ID: {product.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
               </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4 text-gray-500 dark:text-gray-200">
            <div className="mb-2 text-base sm:text-lg">
              {obtenerMensajeVacio()}
            </div>
            {terminoBusqueda && (
              <div className="text-sm text-gray-400 dark:text-gray-200">
                Intenta con otros términos de búsqueda
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import React from 'react';

  export const DataBody = <T,> (props: IDataBody<T>) => {
    const { 
      data = [], 
      terminoBusqueda = '', 
      totalElementos = 0,
      actions,
      renderDesktop,
      renderMovil ,
       isLoading = false,
    errors
    } = props;
      
      console.log("Obteniendo datos de forma generica con T",data)
    const obtenerMensajeVacio = () => {
      if (terminoBusqueda.trim()) {
        return `No se encontraron resultados para "${terminoBusqueda}".`;
      }
      return 'No hay elementos disponibles.';
    };

    return (
      <>
       <div className="bg-white dark:bg-gray-800">
        {
          data && data.length > 0 ? (
            <div className="divide-y divide-gray-100">
                    {data.map((item, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700">
                <div className="hidden md:block">{renderDesktop(item,actions!)}</div>
                <div className="block md:hidden">{renderMovil(item,actions!)}</div>
              </div>
              ))}

            </div>
          ):
          (
          <div className="text-center py-12 px-4 text-gray-500 dark:text-gray-200">
            
            <div className="mb-2 text-base sm:text-lg">
              {obtenerMensajeVacio()}
            </div>

              {terminoBusqueda && (
                <div className="text-sm text-gray-400 dark:text-gray-200">
                  Intenta con otros términos de búsqueda
                </div>
              )}
          </div>
          )
        
        }
      </div> 
     
     </>
    );
  };

