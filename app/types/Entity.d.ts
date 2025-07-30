interface IDataGrid<T>{
    dataHeader: IDataHeader;
    dataBody: IDataBody<T>;
    dataPaginator: IDataPaginatorConfig;
}


interface IDataHeader{
    title?: string;
    btn_text?:string;
    isSearch?:boolean;
    isUpdate?:boolean;
      terminoBusqueda?: string;
      setTerminoBusqueda?: (termino: string) => void;

}

interface IDataPaginatorConfig {
    pagina?: number; // Elementos por página (opcional, default 5)
}
interface IDataBody <T>{
    data?: T[];
    terminoBusqueda?: string;
    totalElementos?: number;
    isStarred?: boolean;
    isDraft?: boolean;
    isRead?: boolean;
    isArchived?: boolean;
    renderDesktop: (item: T) => React.ReactNode;
  renderMovil: (item: T) => React.ReactNode;
}



interface IDataPaginator{
     pagina: number;
  paginaActual: number;
  setPaginaActual: (pagina: number) => void;
  totalElementos: number;
  totalPaginas: number;

}


