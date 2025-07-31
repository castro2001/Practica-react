interface IWelcome{
    title:string,
    descripcion:IDescription;
    image?:string | string[];
    isIcon?:boolean;
     
}

interface IDescription{
    content?:string | React.ReactNode;
    icon?:React.ReactNode
}