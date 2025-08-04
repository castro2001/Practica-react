interface ICard extends ICardMain {
    content:string;
    themes:ICardThemes
}

interface ICardHeader extends ICardMain {
    icono2?: React.ReactNode;
    iconotitulo: string;
}

interface ICardThemes{
    classNameIcon?:string;
    classNameText?:string;

}

interface ISection{
    classNameContainer:string;
    content:React.ReactNode;
}

interface IPreloadCard extends ICardMain {}


interface ICardMain{
    titulo:string;
    icon: React.ReactNode;
    subtitulo?:string;
}