import React, { createContext, useContext, useEffect } from 'react'
import { useAuthLogic } from '~/logic/useAuthLogic';


const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const useAuth = ( )=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe ser usadao dentro del provider")
    }
    return context;
}

interface AuthProviderProps{
      children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children})=>{
    const logic = useAuthLogic();

    useEffect(()=>{
        logic.refreshAuth();
    },[])

    return(
        <AuthContext.Provider value={logic}>
            {children}
        </AuthContext.Provider>
    )
}