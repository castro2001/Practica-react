import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState,useEffect } from 'react';

export const DataPaginator = (props: IDataPaginator)=> {
 const {pagina = 5, paginaActual,setPaginaActual,dataFiltrada = [],setDataFiltrada} = props;
  
 // Efecto para manejar la paginación
  useEffect(() => {
    if (!dataFiltrada || dataFiltrada.length === 0) {
      setDataFiltrada([]);
      return;
    }

    const indiceUltimo = paginaActual * pagina;
    const indicePrimero = indiceUltimo - pagina;
    const paginados = dataFiltrada.slice(indicePrimero, indiceUltimo);

    setDataFiltrada(paginados);
  }, [dataFiltrada, paginaActual, pagina]);

  // Cálculo Total de Páginas
  const totalPaginas = Math.ceil(dataFiltrada.length / pagina);

  // Funciones para gestionar cambios de página
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

    // Generar números de páginas para mostrar
  const generarNumerosPaginas = () => {
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
  }

  return (
    <>
      {dataFiltrada && dataFiltrada.length > pagina && (
                <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    {/* Información de elementos */}
                    <div className="text-sm text-gray-700">
                      Mostrando {(paginaActual - 1) * pagina + 1} a{' '}
                      {Math.min(paginaActual * pagina, dataFiltrada.length)} de {dataFiltrada.length} elementos
                    </div>

                    {/* Controles de paginación */}
                    <div className="flex items-center space-x-2">
                      {/* Botón anterior */}
                      <button
                        onClick={irAPaginaAnterior}
                        disabled={paginaActual === 1}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                          paginaActual === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Anterior
                      </button>

                      {/* Números de página */}
                      <div className="flex space-x-1">
                        {generarNumerosPaginas().map((numeroPagina) => (
                          <button
                            key={numeroPagina}
                            onClick={() => cambiarPagina(numeroPagina)}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                              numeroPagina === paginaActual
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {numeroPagina}
                          </button>
                        ))}
                      </div>

                      {/* Botón siguiente */}
                      <button
                        onClick={irAPaginaSiguiente}
                        disabled={paginaActual === totalPaginas}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                          paginaActual === totalPaginas
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Siguiente
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
      )}
    </>
    
  );
}