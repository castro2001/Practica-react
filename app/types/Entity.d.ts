interface IDataGrid<T>{
  dataHeader: IDataHeader;
  dataBody: IDataBody<T>;
  dataPaginator: IDataPaginatorConfig;
  filterConfig?: IFilterConfig<T>;
}

interface IDataHeader{
    title?: string;
    btn_text?:string;
    isBtn?:boolean;
    isSearch?:boolean;
    isUpdate?:boolean;
    isLoading?: boolean;
    isIcon?:boolean;
    isOptions:boolean;
    viewMode?:string;
    // modal:IModalDataHeader;
    setViewMode?:(mode: string) => void;
    icon?:React.ReactNode;
    terminoBusqueda?: string;
    setTerminoBusqueda?: (termino: string) => void;
}

interface IModalDataHeader{
    isOpen: boolean;
  setIsOpen: (open:boolean) => void;
  size:string;
  contentModal: React.ReactNode;
}


interface Options{
  name:string;
  
}

interface IDataBody <T>{
    data?: T[];
    terminoBusqueda?: string;
    totalElementos?: number;
    actions?: IActionsDataBody;
    isLoading?: boolean;
    errors?:Error |null;
  
    renderDesktop: (item: T,actions: IActionsDataBody ) => React.ReactNode;
    renderMovil: (item: T,actions: IActionsDataBody) => React.ReactNode;
}

interface IDataPaginator{
     pagina: number;
  paginaActual: number;
  setPaginaActual: (pagina: number) => void;
  totalElementos: number;
  totalPaginas: number;

}

interface IDataPaginatorConfig {
    pagina?: number; // Elementos por página (opcional, default 5)
}

// Types para filtros dinámicos
interface IFilterConfig<T> {
  searchFields?: (keyof T)[];  // Campos donde buscar
  customFilter?: (item: T, searchTerm: string) => boolean; // Función de filtro personalizada
}

interface IActionsDataBody{
  isStarred?: boolean;
  isDraft?: boolean;
  isRead?: boolean;
  isArchived?: boolean;
        viewMode?:string;
          setViewMode?:(mode: string) => void;
}