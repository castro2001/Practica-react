
import React, { useState, useRef, useEffect } from 'react';
import { Settings, User, Bell, Grid3X3 } from 'lucide-react';



export const ModalNotificaciones = ()=>{
      const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event:Event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    
    return (
        <>
        <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors relative"
            >
              <Bell className="w-6 h-6 text-slate-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">3</span>
            </button>
        </div>
         {/* Dropdown de notificaciones */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 z-50">
                {/* Header del dropdown */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                  <h2 className="text-lg font-medium text-white">Notifications</h2>
                  <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                    Mark all as read
                  </button>
                </div>

                {/* Contenido scrolleable */}
                <div className="max-h-96 overflow-y-auto">
                  {/* NEW Section */}
                  <div className="p-4">
                    <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">NEW</div>
                    
                    {/* Emma Watson notification */}
                    <div className="flex items-start space-x-3 mb-4 p-2 hover:bg-slate-700 rounded-lg transition-colors">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b830?w=40&h=40&fit=crop&crop=face" 
                        alt="Emma Watson" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="font-medium">Emma Watson</span> replied to your comment: "Hello world 😊"
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Just now</p>
                      </div>
                    </div>

                    {/* Albert Brooks notification */}
                    <div className="flex items-start space-x-3 mb-4 p-2 hover:bg-slate-700 rounded-lg transition-colors">
                      <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                        AB
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="font-medium">Albert Brooks</span> reacted to Mia Khalifa's status
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
                        <p className="text-sm text-white">
                          The forecast today shows a low of 20°C in California. See today's weather.
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-400 text-lg mr-2">⛅</span>
                          <span className="text-xs text-slate-400">1d</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-700">
                  <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
        </>
    )


}