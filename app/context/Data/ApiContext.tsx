import React, { createContext, useContext, useEffect,useReducer } from 'react'
import { useApiLogic } from '~/logic/useApi';
import { useAuthLogic } from '~/logic/useAuthLogic';


const ApiContext = createContext<IApiContextState | undefined>(undefined);

export const useApi = ( )=>{
    const context = useContext(ApiContext);
    if(!context){
        throw new Error("useApi debe ser usado dentro del Apiprovider")
    }
    return context;
}

interface AuthProviderProps{
      children: React.ReactNode;
}

export const ApiProvider: React.FC<AuthProviderProps> = ({children})=>{
    const logic = useApiLogic();

    useEffect(()=>{
        logic.getProducts();
        logic.getCategories()
    },[logic.getProducts,logic.getCategories])

    return(
        <ApiContext.Provider value={logic}>
            {children}
        </ApiContext.Provider>
    )
}