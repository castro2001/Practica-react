import React, { useRef, useEffect } from 'react';

import "./ModalNotificaciones.css";
export const ModalNotificaciones = (props: IActionsModal) => {
  const {isOpen = false, onClose,modalbody} = props;

  const {title="Notificaciones",content,classNameContainer="",
    redirect_Text="Marcar todo como leído" ,redirect="/" } = modalbody
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`${classNameContainer} absolute  z-50 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-700`}
    >
      {/* Header del dropdown */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className="text-lg font-medium text-white">{title}</h2>
        <button 
          className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
          onClick={onClose}
          
        >
          {redirect_Text}
        </button>
      </div>

      {/* Contenido scrolleable */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {content}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors w-full text-center">
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
};