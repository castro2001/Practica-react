import React, { useState } from 'react';
import { DataHeader } from './DataHeader/DataHeader';
import { DataBody } from './DataBody/DataBody';
import { DataPaginator } from './DataPaginator/DataPaginator';

export const DataGrid = (props: IDataGrid)=> {
  const { dataHeader, dataBody,dataPaginator } = props;
  const {title,btn_text,isSearch,isUpdate} = dataHeader;
  const {data= []} = dataBody;
  const {pagina,paginaActual,setPaginaActual,dataFiltrada = data,setDataFiltrada} = dataPaginator;

  return (
    <>
   <div className="container mx-auto max-w-5xl   rounded-lg shadow-lg overflow-hidden ">
     <DataHeader 
      title={title}
      btn_text={btn_text} 
      isSearch={isSearch} 
      isUpdate = {isUpdate} 
    />
    <DataBody 
    data={data}
    buscador=''
    />
    <DataPaginator 
    pagina={pagina}
    paginaActual={paginaActual} 
    setPaginaActual={setPaginaActual} 
    dataFiltrada={dataFiltrada} 
    setDataFiltrada={setDataFiltrada}

    />
   </div>
    
    </>
    
  );
}