import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
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
   const EmptyComponent = () => {
     const obtenerMensajeVacio = () => {
       if (terminoBusqueda.trim()) {
         return `No se encontraron resultados para "${terminoBusqueda}".`;
       }
       return 'No hay elementos disponibles.';
     };
 
     return (
       <div className="bg-white dark:bg-gray-800">
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
     return <EmptyComponent />;
   }
 
   // Renderizado normal de datos
   return (
     <div className="bg-white dark:bg-gray-800">
       <div className="divide-y divide-gray-100">
         {data.map((item, index) => (
           <div key={index} className="border-b border-gray-200 dark:border-gray-700">
             <div className="hidden md:block">{renderDesktop(item, actions!)}</div>
             <div className="block md:hidden">{renderMovil(item, actions!)}</div>
           </div>
         ))}
       </div>
     </div> 
   );
  };

