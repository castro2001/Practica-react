interface IDataGrid{
    dataHeader: IDataHeader;
    dataBody: IDataBody;
    dataPaginator: IDataPaginatorConfig;
}


interface IDataHeader{
    title: string;
    btn_text?:string;
    isSearch?:boolean;
    isUpdate?:boolean;
      terminoBusqueda?: string;
      setTerminoBusqueda?: (termino: string) => void;

}

interface IDataPaginatorConfig {
    pagina?: number; // Elementos por página (opcional, default 5)
}
interface IDataBody{
    data?: IProduct[];
    terminoBusqueda?: string;
    totalElementos?: number;
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


interface IProduct{
    id:number;
    title:string;
    slug:string
    price:number;
    description:string;
    category: Category;
    images: string[]
    creationAt: Date;
    updateAt: Date;
}


interface Category{
    id:number;
    name:string;
    slug:string;
    image:string;
    creationAt: Date;
    updateAt: Date;
}