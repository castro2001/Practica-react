interface IDataGrid<T>{
    dataHeader: IDataHeader;
    dataBody: IDataBody<T>;
    dataPaginator: IDataPaginatorConfig;
      filterConfig?: IFilterConfig<T>;
}

// Types para filtros dinámicos
interface IFilterConfig<T> {
  searchFields?: (keyof T)[];  // Campos donde buscar
  customFilter?: (item: T, searchTerm: string) => boolean; // Función de filtro personalizada
}


interface IDataHeader{
    title?: string;
    btn_text?:string;
    isSearch?:boolean;
    isUpdate?:boolean;
        isLoading?: boolean;

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
    actions?: IActionsDataBody;
    isLoading?: boolean;
    errors: Error | null;
    renderDesktop: (item: T,actions: IActionsDataBody ) => React.ReactNode;
    renderMovil: (item: T,actions: IActionsDataBody) => React.ReactNode;
}

interface IActionsDataBody{
   isStarred?: boolean;
    isDraft?: boolean;
    isRead?: boolean;
    isArchived?: boolean;
}


interface IDataPaginator{
     pagina: number;
  paginaActual: number;
  setPaginaActual: (pagina: number) => void;
  totalElementos: number;
  totalPaginas: number;

}


