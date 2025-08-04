// hooks/useCategoriaLogic.ts
import { useCallback, useState } from "react";
import { CategoriaServices } from "~/services/categoriaServices";
import { ProductoServices } from "~/services/productoServices";


export const useProductLogic = () => {
  const [productos, setProductos] = useState<IProduct[] | null>(null);
    const [producto, setProducto] = useState<IProduct | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
const API_BASE = 'https://api.escuelajs.co/api/v1';

  const getProductos = useCallback(async (): Promise<IProduct[] | null> => {
    setLoading(true);
    setError(null);
    const categoriaService = new ProductoServices(API_BASE);

    try {
      const result = await categoriaService.getProductos();
      setProductos(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductosById = useCallback(async (id:string): Promise<IProduct[] | null> => {
    setLoading(true);
    setError(null);
    const categoriaService = new ProductoServices(API_BASE);

    try {
      const result = await categoriaService.getProductoById(id);
        setProducto(result);
        return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    productos,
    producto,
    getProductos,
    getProductosById,
    isLoading,
    error,
  };
};
