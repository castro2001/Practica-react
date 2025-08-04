import { useState,useCallback } from "react"
import { authService } from "~/services/authServices"
import { setCookie } from "~/utils/cookies";

export const useAuthLogic=()=>{

    const [state,setState] = useState<AuthState>({
        user:null, 
        isAuthenticated:false,
        isLoading:true,
        error:null,
        token:" "
    });

    const setLoading = (isLoading:boolean)=>{
        setState(prev=>({...prev,isLoading}));
    }

    const setError = (error:string |null)=>{
        setState(prev=>({...prev,error}));
    }

    const setUser = (user:User| null)=>{
        setState(prev=>({...prev,
            user,
            isAuthenticated: !!user,
            isLoading:false,
            error:null
        }));
    }

    const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> =>{
        try {
            setLoading(true);
            setError(null);
            const {user,token} = await authService.login(credentials);
            setUser(user);
            
          
            return true;

        } catch (error) {
            setError(error instanceof Error ? error.message : "error en el login");
            setLoading(false);
            return false;
        }
    },[]);

    const register = useCallback(async (data: RegisterData): Promise<boolean> =>{
        try {
            setLoading(true);
            setError(null);
            await authService.register(data);

            //Despues del registro, Hacer el login automatico
            const loginSuccess = await login({
                email: data.email,
                password: data.password
            });
            
            return loginSuccess;

        } catch (error) {
            setError(error instanceof Error ? error.message : "error en el registro");
            setLoading(false);
            return false;
        }
    },[login]);

    const logout = useCallback(()=>{
        authService.logout();
        setUser(null);
    },[]);

    const refreshAuth = useCallback( async (): Promise<void> =>{
        try {
            setLoading(true);
            const user = await authService.refreshToken();
            setUser(user);
        } catch (error) {
            setUser(null);
        }
    },[]);

    const hasRole = useCallback((role:string): boolean =>{
        return state.user?.role === role;
    },[state.user]);

    const hasAnyRole = useCallback((roles:string[]): boolean =>{
        return state.user ? roles.includes(state.user.role) : false;
    },[state.user]);

        const getToken = (): string | null => {
        return authService.getTokenValue();
        };


    return{
        ...state,
        login,
        register,
        logout,
        refreshAuth,
        hasRole,
        getToken,
        hasAnyRole,
        
    }
}