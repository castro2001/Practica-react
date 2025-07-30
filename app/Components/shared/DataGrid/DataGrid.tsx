// DataGrid.tsx - Componente principal con lógica centralizada
import React, { useState, useEffect, useMemo } from 'react';
import { DataHeader } from './DataHeader/DataHeader';
import { DataBody } from './DataBody/DataBody';
import { DataPaginator } from './DataPaginator/DataPaginator';

export const DataGrid = <T,> (props: IDataGrid<T> ) => {
  const { dataHeader, dataBody, dataPaginator } = props;
  // const { title, btn_text, isSearch, isUpdate } = dataHeader;
  const { data = [] } = dataBody;
  const { pagina = 5 } = dataPaginator;

  // Estados centralizados
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtrosActivos, setFiltrosActivos] = useState({});

  // Datos filtrados por búsqueda y filtros (sin paginar)
  const dataFiltrada = useMemo(() => {
    let resultado = [...data];

    // Aplicar búsqueda
    if (terminoBusqueda.trim()) {
      resultado = resultado.filter((item: any) =>
        item.title?.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        item.description?.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        item.category?.name?.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    }

    // Aplicar filtros adicionales aquí si es necesario
    // Object.keys(filtrosActivos).forEach(key => {
    //   if (filtrosActivos[key]) {
    //     resultado = resultado.filter(item => item[key] === filtrosActivos[key]);
    //   }
    // });

    return resultado;
  }, [data, terminoBusqueda, filtrosActivos]);

  // Datos paginados (solo los elementos de la página actual)
  const dataPaginada = useMemo(() => {
    const indiceInicio = (paginaActual - 1) * pagina;
    const indiceFin = indiceInicio + pagina;
    return dataFiltrada.slice(indiceInicio, indiceFin);
  }, [dataFiltrada, paginaActual, pagina]);

  // Resetear página cuando cambian los filtros o búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [terminoBusqueda, filtrosActivos]);

  // Cálculos para paginación
  const totalElementos = dataFiltrada.length;
  const totalPaginas = Math.ceil(totalElementos / pagina);

  return (
    <div className="container mx-auto max-w-6xl rounded-lg shadow-lg overflow-hidden">
      <DataHeader {... dataHeader}/>
      <DataBody  {...dataBody} /> 
      {totalElementos > pagina && (
        <DataPaginator 
          pagina={pagina}
          paginaActual={paginaActual} 
          setPaginaActual={setPaginaActual} 
          totalElementos={totalElementos}
          totalPaginas={totalPaginas}
        />
      )}

    </div>
  );
};
