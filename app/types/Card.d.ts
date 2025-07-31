interface ICard {
    icon: React.ReactNode;
    titulo: string;
    subtitulo:string;
    content:string;
    themes:ICardThemes

}

interface ICardThemes{
    classNameIcon?:string;
    classNameText?:string;

}

interface ISection{
    classNameContainer:string;
    content:React.ReactNode;
}

interface IPreloadCard{
     icon: React.ReactNode;
    titulo: string;
    subtitulo:string;
}