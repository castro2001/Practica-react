interface IProduct{
    id:number;
    title:string;
    slug:string
    price:number;
    description:string;
    category: ICategory;
    images: string[]
    creationAt: Date;
    updateAt: Date;
}


interface ICategory{
    id:number;
    name:string;
    slug:string;
    image:string;
    creation_At: Date;
    update_At: Date;
}

interface IUsuarios{
    id:number;
    email:string;
    password:string;
    name:string;
    role:string;
    avatar:string;
    creationAt: Date;
    updateAt: Date;

}