


export const Card = (props:ICard)=>{
    
    return (
        <>
        
         
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Precio</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Valor del producto</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ${finalData.price || 0}
                  </div>
                </div>
        
        </>
    )
}