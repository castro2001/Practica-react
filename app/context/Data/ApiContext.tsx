import React, { createContext, useContext, useEffect,useReducer } from 'react'
import { useApiLogic } from '~/logic/useApi';


const ApiContext = createContext<IApiContextState | undefined>(undefined);

export const useApiContext = ( )=>{
    const context = useContext(ApiContext);
    if(!context){
        throw new Error("useApi debe ser usado dentro del Apiprovider")
    }
    return context;
}

interface ApiProviderProps{
      children: React.ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({children})=>{
    const logic = useApiLogic();

   useEffect(() => {
    logic.getProducts();
    // logic.getCategories();
  }, [logic.getProducts]); // Ahora las dependencias son estables

    return (
        <ApiContext.Provider value={logic}>
            {children}
        </ApiContext.Provider>
    );
}