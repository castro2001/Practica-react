import React from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';


export const Preoload = ()=>(
    <div className="bg-white dark:bg-gray-800">
       <div className="flex flex-col items-center justify-center py-16 px-4">
         <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
         <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
           Cargando datos...
         </h3>
         <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
           Por favor espera mientras obtenemos la información más reciente.
         </p>
         
         {/* Skeleton loading para dar feedback visual */}
         <div className="w-full max-w-4xl mt-8 space-y-4">
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="animate-pulse flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
               <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
               <div className="flex-1 space-y-2">
                 <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                 <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
               </div>
               <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
             </div>
           ))}
         </div>
       </div>
     </div>
)

