  import { Clock, MoreHorizontal, Star } from 'lucide-react';
  import React, { useState } from 'react';
  import BackgroundDefault from "~/assets/image/background_default.png"
import { DataBodyDesktop } from './view/DataBody.desktop';
import { DataBodyMovil } from './view/DataBody.movil';


  export const DataBody = <T,> (props: IDataBody<T>) => {
    const { data = [], 
      terminoBusqueda = '', 
      totalElementos = 0,
      isStarred,
      isDraft,
      isArchived,
      isRead ,
      renderDesktop,
      renderMovil 
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
          data && data.length >0 ? (
            <>
              {data.map((item, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700">
                <div className="hidden md:block">{renderDesktop(item)}</div>
                <div className="block md:hidden">{renderMovil(item)}</div>
              </div>
              ))}

            </>
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

