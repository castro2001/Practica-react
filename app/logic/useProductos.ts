// hooks/useCategoriaLogic.ts
import { useCallback, useState } from "react";
import { CategoriaServices } from "~/services/categoriaServices";
import { productoServices } from "~/services/modules/productos.services";
import { ProductoServices } from "~/services/productoServices";


export const useProductLogic = () => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<IProduct>();

  const productService = productoServices;

  // const getProducts = useCallback(async (id: string = ''): Promise<IProduct[]> => {
  //   try {
  //     const response = await productService.getProductos(id);
  //     setProducts(response);
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     throw error;
  //   }
  // }, [productService]);
 
};
