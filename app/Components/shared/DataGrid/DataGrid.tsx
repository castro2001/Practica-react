import React, { useState, useEffect, useMemo } from 'react';
import { DataHeader } from './DataHeader/DataHeader';
import { DataBody } from './DataBody/DataBody';
import { DataPaginator } from './DataPaginator/DataPaginator';

export const DataGrid = <T,> (props: IDataGrid<T> ) => {
  const { dataHeader, dataBody, dataPaginator ,filterConfig } = props;
  const {title,btn_text,isSearch,isUpdate,viewMode="table",setViewMode} = dataHeader;
  const { data = [] ,renderDesktop,renderMovil,isLoading,errors} = dataBody;
  const { pagina = 5 } = dataPaginator;

  // Estados centralizados
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosActivos, setFiltrosActivos] = useState({});

    // ✅ Función de filtrado dinámico
  const aplicarFiltrosDinamicos = (items: T[], searchTerm: string): T[] => {
    if (!searchTerm.trim() || !filterConfig) {
      return items;
    }

    // Si hay una función de filtro personalizada, usarla
    if (filterConfig.customFilter) {
      return items.filter(item => filterConfig.customFilter!(item, searchTerm));
    }

    // Si no, usar los campos configurados
    const searchLower = searchTerm.toLowerCase();
      return items.filter(item => {
        return filterConfig.searchFields.some(field => {
          const fieldValue = item[field];
          if (fieldValue == null) return false;
          
          // Manejar diferentes tipos de datos
          if (typeof fieldValue === 'string') {
            return fieldValue.toLowerCase().includes(searchLower);
          }
          
          if (typeof fieldValue === 'number') {
            return fieldValue.toString().includes(searchTerm);
          }
          
          // Para objetos anidados (como category.name)
          if (typeof fieldValue === 'object' && fieldValue !== null) {
            return JSON.stringify(fieldValue).toLowerCase().includes(searchLower);
          }
    
          return false;
        });
      });
    };

// Datos filtrados por búsqueda y filtros (sin paginar)
  const dataFiltrada = useMemo(() => {
    // Si está cargando o hay errores, no filtramos
    if (isLoading || errors || !data.length)  return [];
    let resultado = [...data];
    // ✅ Aplicar filtros dinámicos
    if (terminoBusqueda.trim() && filterConfig) {
      resultado = aplicarFiltrosDinamicos(resultado, terminoBusqueda);
    }
    return resultado;
  }, [data, terminoBusqueda, filtrosActivos, isLoading, errors, filterConfig]);

  // Datos paginados (solo los elementos de la página actual)
  const dataPaginada = useMemo(() => {
    if (isLoading || errors) {
      return [];
    }

    const indiceInicio = (paginaActual - 1) * pagina;
    const indiceFin = indiceInicio + pagina;
    return dataFiltrada.slice(indiceInicio, indiceFin);
  }, [dataFiltrada, paginaActual, pagina, isLoading, errors]);

  // Resetear página cuando cambian los filtros o búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [terminoBusqueda, filtrosActivos]);

  // Cálculos para paginación
  const totalElementos = dataFiltrada.length;
  const totalPaginas = Math.ceil(totalElementos / pagina);

  const dataheader:IDataHeader = {
    title:title,
    btn_text: btn_text, 
    isSearch: isSearch ,
    isUpdate : isUpdate,
    viewMode:viewMode,
    setViewMode:setViewMode,
    isOptions:true,
    terminoBusqueda:terminoBusqueda,
    setTerminoBusqueda:setTerminoBusqueda
  }

  const databody: IDataBody<T> = {
    data:dataPaginada, // Solo pasamos los datos de la página actual
    terminoBusqueda:terminoBusqueda,
    totalElementos:totalElementos ,
    renderDesktop:renderDesktop ,
    renderMovil:renderMovil,
    isLoading:isLoading,
    errors:errors
  }

  const datapaginator: IDataPaginator={
    pagina:pagina,
    paginaActual:paginaActual, 
    setPaginaActual:setPaginaActual, 
    totalElementos:totalElementos,
    totalPaginas:totalPaginas,
  }

  return (
    <div className="min-h-screen ">
    <div className="container mx-auto p-6">
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        <DataHeader {...dataheader} />
        
       {viewMode === "table" ? (
  <div className="bg-white dark:bg-gray-800">
    {/* Header */}
    <div className="flex items-center bg-gray-50 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600 px-6 py-4 font-semibold text-xs text-gray-600 dark:text-gray-300 uppercase tracking-wider">
      <div className="w-16 flex-shrink-0">ID</div>
      <div className="w-20 flex-shrink-0">Imagen</div>
      <div className="flex-1 min-w-0 px-4">Producto</div>
      <div className="w-24 flex-shrink-0">Precio</div>
      <div className="w-32 flex-shrink-0 text-center">Acciones</div>
    </div>
    
    {/* Contenido */}
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <DataBody {...databody} />
    </div>
  </div>
) : (
  <DataBody {...databody} />
)}

        
        {totalElementos > pagina && (
          <DataPaginator {...datapaginator} />
        )}
      </div>
    </div>
  </div>
  );
};