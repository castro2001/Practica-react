interface IDataGrid{
    dataHeader: IDataHeader;
    dataBody: IDataBody;
    dataPaginator: IDataPaginator;
}


interface IDataHeader{
    title: string;
    btn_text?:string;
    isSearch?:boolean;
    isUpdate?:boolean;
}


interface IDataBody{
    data?: IProduct[];
    buscador:string;
}


interface IDataPaginator{
    pagina:number;
    paginaActual: number;
    setPaginaActual: (number : number) => number;
    
    dataFiltrada: IProduct[];
    setDataFiltrada: (data: IProduct[])=>void;

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