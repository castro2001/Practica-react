interface IWelcome{
    title:string,
    descripcion:IDescription;
    image?:string;
    isIcon?:boolean;
}

interface IDescription{
    content?:string;
    icon?:React.ReactNode
}