import { useState,useCallback } from "react"
import { authService } from "~/services/authServices"
import { CategoriaServices } from "~/services/categoriaServices";
import { productoServices } from "~/services/modules/productos.services";
import { ProductoServices } from "~/services/productoServices";
import { setCookie } from "~/utils/cookies";

export const useApiLogic=()=>{

    const [state,setState] = useState<IApiContextState>({
        products: [],
        productsLoading: false,
        
        productsError: null,
        categories: [],
        categoriesLoading: false,
        categoriesError: null,
        currentProduct: null,
        productLoading: false,
        productError: null,
   });
   const apiProductos = productoServices
  const setProductsLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, productsLoading: loading }));
  }, []);

  const setProductsError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, productsError: error, productsLoading: false }));
  }, []);

  const setProducts = useCallback((products: IProduct[] = []) => {
    setState(prev => ({
      ...prev,
      products,
      productsLoading: false,
      productsError: null
    }));
  }, []);

 const setCurrentProduct = useCallback((product: IProduct | null ) => {
    setState(prev => ({
      ...prev,
      currentProduct: product,
      productLoading: false,
      productError: null
    }));
  }, []);

  const getProducts = useCallback(async (): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const product = await apiProductos.getProductos();
      
      setProducts(product);
      
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al cargar productos");
      return false;
    }
  }, [setProductsLoading, setProductsError, setProducts]);

  const getProduct = useCallback(async (id:number): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      const product = await apiProductos.getProducto(id);
      
      setCurrentProduct(product);
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al cargar productos");
      return false;
    }
  }, [setProductsLoading, setProductsError, setProducts]);



    // Limpiar errores
  const clearProductsError = useCallback(() => {
    setProductsError(null);
  }, [setProductsError]);

    const resetCurrentProduct = useCallback(() => {
    setCurrentProduct(null);
  }, [setCurrentProduct]);


return {
  ...state,
  getProduct,
  getProducts,
  
  clearProductsError,
  resetCurrentProduct
}


}