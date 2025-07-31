import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorLoad = (error:Error)=>{
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 dark:from-red-900/20 dark:via-pink-900/20 dark:to-rose-900/20 flex items-center justify-center p-6">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-red-200/50 dark:border-red-700/50 p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Error al cargar los datos
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {error?.message || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        </div>
      </div>
    </div>
}