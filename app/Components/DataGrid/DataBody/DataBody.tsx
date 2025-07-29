import { Clock, MoreHorizontal, Star } from 'lucide-react';
import React, { useState } from 'react';

export const DataBody = (props: IDataBody)=> {
  const {data=[],buscador=''} = props;
  

  return (
    <>

{data && data.length > 0 ? (
              data.map((product: IProduct) => (
                <div key={product.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      // checked={elementosSeleccionados.has(product.id)}
                      // onChange={() => manejarSeleccionIndividual(product.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <button className="text-gray-400 hover:text-yellow-500 transition-colors duration-150 ease-in-out">
                      <Star className="h-4 w-4" />
                    </button>
                    <img
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      src={product.images[0]}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {product.category.name || 'General'}
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          NUEVO
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium truncate mb-1">
                        {product.title}
                      </p>
                      <p className="text-gray-600 text-sm truncate">
                        {product.description}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                      {/* {formatearFecha(product.)} */}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                {buscador ? 'No se encontraron resultados para tu búsqueda.' : 'No hay mensajes disponibles.'}
              </div>
            )}

    </>
    
  );
}