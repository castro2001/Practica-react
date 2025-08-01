import BackgroundDefault from "~/assets/image/background_default.png"


export const notificationsPanel = (
  <>
    {/* NEW Section */}
    <div className="p-4">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">NEW</div>

        {/* Emma Watson notification */}
            <div className="flex items-start space-x-3 mb-4 p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <img 
                src={BackgroundDefault} 
                alt="Emma Watson" 
                className="w-10 h-10 rounded-full"
                />
            <div className="flex-1">
                <p className="text-sm dark:text-white text-gray-500">
                <span className="font-medium  dark:text-white text-gray-500">Emma Watson</span> replied to your comment: "Hello world 😊"
                </p>
                <p className="text-xs text-slate-400 mt-1">Just now</p>
            </div>
    </div>

    {/* Albert Brooks notification */}
        <div className="flex items-start space-x-3 mb-4 p-2 dark:hover:bg-slate-700 rounded-lg transition-colors  hover:bg-gray-300">
            <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                AB
            </div>
            <div className="flex-1">
                <p className="text-sm dark:text-white text-gray-500">
                <span className="font-medium  dark:text-white text-gray-600">Albert Brooks</span> reacted to Mia Khalifa's status
                </p>
                <div className="flex items-center mt-1">
                    <span className="text-red-500 text-lg mr-2">❤️</span>
                    <span className="text-xs text-slate-400">9hr</span>
                </div>
            </div>
        </div>
    </div>

    {/* EARLIER Section */}
    <div className="px-4 pb-4">
    <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">EARLIER</div>

    {/* Weather notification */}
    <div className="flex items-start space-x-3 mb-4 p-2 hover:bg-slate-700 rounded-lg transition-colors">
    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
    <span className="text-lg">🌤️</span>
    </div>
    <div className="flex-1">
    <p className="text-sm text-gray-500 dark:text-white">
    The forecast today shows a low of 20°C in California. See today's weather.
    </p>
    <div className="flex items-center mt-1">
    <span className="text-yellow-400 text-lg mr-2">⛅</span>
    <span className="text-xs text-slate-400">1d</span>
    </div>
    </div>
    </div>
    </div>
  
  </>
);

export const panelUser = (
<>
<a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Mi Perfil</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Configuración</a>
                    <div className="border-t border-gray-100 dark:border-gray-700"></div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Cerrar Sesión</a>
</>
);

export const mensajesModal = (
<>        
    <div className="flex items-start space-x-3 mb-4 p-2 hover:bg-slate-700 rounded-lg transition-colors">
        <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
            AB
        </div>
        <div className="flex-1">
            <p className="text-sm text-white">
            <span className="font-medium">Nuevo mensaje recibido</span> Juan Pérez te ha enviado un mensaje
            </p>
            <div className="flex items-center mt-1">
                <span className="text-red-500 text-lg mr-2">❤️</span>
                <span className="text-xs text-slate-400">Hace 5 minutos</span>
            </div>
        </div>
    </div>
    
</>
);