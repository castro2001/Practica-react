import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export const DataPaginator = (props: IDataPaginator) => {
  const { pagina, paginaActual, setPaginaActual, totalElementos, totalPaginas } = props;

  const cambiarPagina = (numeroPagina: number) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  const irAPaginaAnterior = () => {
    cambiarPagina(paginaActual - 1);
  };

  const irAPaginaSiguiente = () => {
    cambiarPagina(paginaActual + 1);
  };

  // Versión desktop - muestra más páginas
  const generarNumerosPaginasDesktop = () => {
    const numeros = [];
    const maxPaginasVisibles = 5;
    let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

    if (fin - inicio + 1 < maxPaginasVisibles) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      numeros.push(i);
    }
    return numeros;
  };

  // Versión móvil - muestra menos páginas
  const generarNumerosPaginasMovil = () => {
    const numeros = [];
    const maxPaginasVisibles = 3;
    let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

    if (fin - inicio + 1 < maxPaginasVisibles) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      numeros.push(i);
    }
    return numeros;
  };

  const elementoInicio = (paginaActual - 1) * pagina + 1;
  const elementoFin = Math.min(paginaActual * pagina, totalElementos);

  // Función para ir a primera y última página
  const irAPrimeraPagina = () => cambiarPagina(1);
  const irAUltimaPagina = () => cambiarPagina(totalPaginas);

  return (
    <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      {/* VERSIÓN MÓVIL */}
      <div className="block sm:hidden">
        {/* Info de elementos - móvil */}
        <div className="text-xs text-gray-600 dark:text-gray-300 text-center mb-3">
          {elementoInicio}-{elementoFin} de {totalElementos}
        </div>

        {/* Controles de paginación móvil */}
        <div className="flex items-center justify-between">
          {/* Botón anterior móvil */}
          <button
            onClick={irAPaginaAnterior}
            disabled={paginaActual === 1}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              paginaActual === 1
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm'
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Atrás
          </button>

          {/* Centro - páginas móvil */}
          <div className="flex items-center space-x-1">
            {/* Primera página si no está visible */}
            {paginaActual > 2 && (
              <>
                <button
                  onClick={irAPrimeraPagina}
                  className="px-2 py-1 rounded text-xs font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  1
                </button>
                {paginaActual > 3 && (
                  <span className="px-1 text-gray-400 dark:text-gray-500">
                    <MoreHorizontal className="h-3 w-3" />
                  </span>
                )}
              </>
            )}

            {/* Páginas centrales */}
            {generarNumerosPaginasMovil().map((numeroPagina) => (
              <button
                key={numeroPagina}
                onClick={() => cambiarPagina(numeroPagina)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 min-w-[32px] ${
                  numeroPagina === paginaActual
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {numeroPagina}
              </button>
            ))}

            {/* Última página si no está visible */}
            {paginaActual < totalPaginas - 1 && (
              <>
                {paginaActual < totalPaginas - 2 && (
                  <span className="px-1 text-gray-400 dark:text-gray-500">
                    <MoreHorizontal className="h-3 w-3" />
                  </span>
                )}
                <button
                  onClick={irAUltimaPagina}
                  className="px-2 py-1 rounded text-xs font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {totalPaginas}
                </button>
              </>
            )}
          </div>

          {/* Botón siguiente móvil */}
          <button
            onClick={irAPaginaSiguiente}
            disabled={paginaActual === totalPaginas}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              paginaActual === totalPaginas
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm'
            }`}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      {/* VERSIÓN DESKTOP */}
      <div className="hidden sm:flex items-center justify-between">
        {/* Información de elementos - desktop */}
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p>
            Mostrando <span className="font-medium">{elementoInicio}</span> a{' '}
            <span className="font-medium">{elementoFin}</span> de{' '}
            <span className="font-medium">{totalElementos}</span> elementos
          </p>
        </div>

        {/* Controles de paginación desktop */}
        <div className="flex items-center space-x-2">
          {/* Botón anterior desktop */}
          <button
            onClick={irAPaginaAnterior}
            disabled={paginaActual === 1}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
              paginaActual === 1
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm'
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </button>

          {/* Números de página desktop */}
          <div className="flex space-x-1">
            {/* Primera página + ... si es necesario */}
            {paginaActual > 3 && (
              <>
                <button
                  onClick={irAPrimeraPagina}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  1
                </button>
                {paginaActual > 4 && (
                  <span className="px-2 py-2 text-gray-400 dark:text-gray-500">
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                )}
              </>
            )}

            {/* Páginas centrales */}
            {generarNumerosPaginasDesktop().map((numeroPagina) => (
              <button
                key={numeroPagina}
                onClick={() => cambiarPagina(numeroPagina)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  numeroPagina === paginaActual
                    ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {numeroPagina}
              </button>
            ))}

            {/* ... + última página si es necesario */}
            {paginaActual < totalPaginas - 2 && (
              <>
                {paginaActual < totalPaginas - 3 && (
                  <span className="px-2 py-2 text-gray-400 dark:text-gray-500">
                    <MoreHorizontal className="h-4 w-4" />
                  </span>
                )}
                <button
                  onClick={irAUltimaPagina}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {totalPaginas}
                </button>
              </>
            )}
          </div>

          {/* Botón siguiente desktop */}
          <button
            onClick={irAPaginaSiguiente}
            disabled={paginaActual === totalPaginas}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
              paginaActual === totalPaginas
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm'
            }`}
          >
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

     
    </div>
  );
};