import React, { useState } from 'react';
import { DataHeader } from './DataHeader/DataHeader';
import { DataBody } from './DataBody/DataBody';
import { DataPaginator } from './DataPaginator/DataPaginator';

export const DataGrid = (props: IDataGrid)=> {
  const { dataHeader, dataBody,dataPaginator } = props;
  const {title,btn_text,isSearch,isUpdate} = dataHeader;
  const {data= []} = dataBody;
  const {} = dataPaginator;

  return (
    <>
   <div className="mx-auto ">
     <DataHeader 
      title={title}
      btn_text={btn_text} 
      isSearch={isSearch} 
      isUpdate = {isUpdate} 
    />
    <DataBody 
    data={data}
    
    />
    <DataPaginator />
   </div>
    
    </>
    
  );
}