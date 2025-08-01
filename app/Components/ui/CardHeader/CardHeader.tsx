export const CardHeader = (props:ICardHeader)=> {

    const {titulo,subtitulo,icon,icono2,iconotitulo} = props;
 
    return(
        <>
         <div className="mb-8 flex items-center md:justify-center md:items-center gap-8 flex-wrap-reverse">
           <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 ml-8 cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:scale-105"
          >
            {/* < size={20} /> */}
            {icon}
            <span className="font-medium">{titulo}</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            {icono2}
                {/* {tipo === "Usuario" ? (
                    <User className="w-5 h-5 text-white" />
                  // </div>
                ) : (
                  // <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  )} */}
              </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {iconotitulo}
              {/* {tipo === "Usuario" ? "Perfil de Usuario" : "Detalles del Producto"} */}
            </h1>
          </div>

         
         
        </div>
        </>
    )
    
}