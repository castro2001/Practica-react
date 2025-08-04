import { Loader2, AlertCircle, RefreshCw, Search } from 'lucide-react';
import React from 'react';
import { Preoload } from '~/Components/ui/Preload/Preoload';

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

 
   // Componente de Error
   const ErrorComponent = () => (
     <div className="bg-white dark:bg-gray-800">
       <div className="flex flex-col items-center justify-center py-16 px-4">
         <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
           <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
         </div>
         <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
           Error al cargar los datos
         </h3>
         <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
           {errors?.message || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'}
         </p>
         <button 
           onClick={() => window.location.reload()}
           className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
         >
           <RefreshCw className="w-4 h-4" />
           <span>Reintentar</span>
         </button>
       </div>
     </div>
   );
 
   // Componente de Empty State
 const EmptyComponent = ( {terminoBusqueda} ) => {
   const obtenerMensajeVacio = () => {
     if (terminoBusqueda?.trim()) {
       return `No se encontraron resultados para "${terminoBusqueda}".`;
     }
     return 'No hay elementos disponibles.';
   };
 
   return (
     <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl">
       <div className="text-center py-16 px-6">
         <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
           <Search className="w-8 h-8 text-white" />
         </div>
         <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
           {terminoBusqueda?.trim() ? 'Sin resultados' : 'Sin elementos'}
         </h3>
         <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
           {obtenerMensajeVacio()}
         </p>
         {terminoBusqueda && (
           <p className="text-sm text-gray-500 dark:text-gray-500">
             Intenta con otros términos de búsqueda
           </p>
         )}
       </div>
     </div>
   );
 };
 
   // Renderizado condicional basado en el estado
   if (isLoading) {
     return <Preoload />;
   }
 
   if (errors) {
     return <ErrorComponent />;
   }
 
   if (!data || data.length === 0) {
    return <EmptyComponent terminoBusqueda={terminoBusqueda} />;
  }
 
   // Renderizado normal de datos
   return (
    <div className="bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/10">
      <div className="divide-y divide-gray-100/50 dark:divide-gray-700/50">
        {data.map((item, index) => (
          <div key={index} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all duration-300">
            <div className="hidden md:block p-6">{renderDesktop(item, actions!)}</div>
            <div className="block md:hidden p-4">{renderMovil(item, actions!)}</div>
          </div>
        ))}
      </div>
    </div>
   );
  };

