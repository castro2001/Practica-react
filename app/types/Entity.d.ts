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
    data?: IProduct[]
}


interface IDataPaginator{
    
}

interface IProduct{
    id:number;
    title:string;
    slug:string
    price:number;
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