


  export const DataBody = <T,> (props: IDataBody<T>) => {
    const { data = [], 
      terminoBusqueda = '', 
      totalElementos = 0,
      actions,
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
          data && data.length > 0 ? (
            <div className="divide-y divide-gray-100">
                    {data.map((item, index) => (
              <div key={index} className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
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

