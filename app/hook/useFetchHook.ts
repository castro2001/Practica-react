import { useEffect, useState,useRef } from "react"

interface IResponse <T>{
    data: T[] | null;
    isLoading: boolean;
    errors: any;
}

export const useFetch = <T>(url: string) => {
    // ✅ Inicializar el estado con valores por defecto
    const [state, setState] = useState<IResponse<T>>({
        data: null,
        isLoading: true,
        errors: null
    });
const abortController = useRef<AbortController | null>(null);
  const hasFetched = useRef(false); // 🔒 evita doble llamada incluso en Strict Mode

    const getFetch = async () => {
        // ✅ Establecer loading antes de la petición
        setState(prev => ({
            ...prev,
            isLoading: true,
            errors: null
        }));
       
        try {
            const response = await fetch(url);
            
            // ✅ Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setState({
                data,
                isLoading: false,
                errors: null
            });
        } catch (error:any) {
                // ⚠️ Evita setState si fue abortado
        if (error.name === "AbortError") return;
            setState({
                data: null,
                isLoading: false,
                errors: error
            });
        }
    }
    
    useEffect(() => {
        if (!url || hasFetched.current) return;
        abortController.current = new AbortController();
        const signal = abortController.current.signal;
        getFetch();
    }, [url]);

    return {
        ...state 
    }
}