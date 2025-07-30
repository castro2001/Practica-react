interface IWelcome{
    title:string,
    descripcion:IDescription;
    image?:string;
    isIcon?:boolean;
      secondImage?: string | null; // ✅ Nuevo campo
}

interface IDescription{
    content?:string | React.ReactNode;
    icon?:React.ReactNode
}