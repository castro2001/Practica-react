import { useEffect, useState } from "react"

interface IResponse{
    data: IProduct[] | null;
    isLoading: boolean;
    errors: any;
}

export const useFetch = (url: string) => {
    // ✅ Inicializar el estado con valores por defecto
    const [state, setState] = useState<IResponse>({
        data: null,
        isLoading: true,
        errors: null
    });

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
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                errors: error
            });
        }
    }
    
    useEffect(() => {
        if (!url) return;
        getFetch();
    }, [url]);

    return {
        ...state 
    }
}