import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorLoad = (error:Error)=>{
         <div className="bg-white dark:bg-gray-800">
       <div className="flex flex-col items-center justify-center py-16 px-4">
         <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
           <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
         </div>
         <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
           Error al cargar los datos
         </h3>
         <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
           {error?.message || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'}
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
}