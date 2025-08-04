// hooks/useCategoriaLogic.ts
import { useCallback, useState } from "react";
import { CategoriaServices } from "~/services/categoriaServices";


export const useCategoriaLogic = () => {
  const [categorias, setCategorias] = useState<ICategory[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
const API_BASE = 'https://api.escuelajs.co/api/v1';

  const getCategorias = useCallback(async (): Promise<ICategory[] | null> => {
    setLoading(true);
    setError(null);
    const categoriaService = new CategoriaServices(API_BASE);

    try {
      const result = await categoriaService.getCategoria();
      setCategorias(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categorias,
    getCategorias,
    isLoading,
    error,
  };
};
