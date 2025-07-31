import { UserRound } from "lucide-react";

export const CardPreload = (props: IPreloadCard)=>{
     const {
    icon = <UserRound  className="w-6 h-6 text-white" />,
    titulo ="Titulo por defecto",
    subtitulo ="Subtitulo por defecto",
  } = props;
    return(
        <>
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              {icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{titulo}</h2>
            <p className="text-gray-600 dark:text-gray-300">{subtitulo}</p>
          </div>
        
        </>
    )
}