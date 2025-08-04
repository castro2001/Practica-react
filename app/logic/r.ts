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
const API_BASE = 'https://api.escuelajs.co/api/v1';
    const apiCategorias = new CategoriaServices(API_BASE);
    // const apiProductos = new ProductoServices(API_BASE);
    const apiProductos = productoServices;

  // Helpers para actualizar estado de productos
  const setProductsLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, productsLoading: loading }));
  }, []);

  const setProductsError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, productsError: error, productsLoading: false }));
  }, []);

  const setProducts = useCallback((products: IProduct[] ) => {
    setState(prev => ({
      ...prev,
      products,
      productsLoading: false,
      productsError: null
    }));
  }, []);

  const setProduct = useCallback((product: IProduct ) => {
    setState(prev => ({
      ...prev,
      product,
      productsLoading: false,
      productsError: null
    }));
  }, []);


  // Helpers para actualizar estado de categorías
  const setCategoriesLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, categoriesLoading: loading }));
  }, []);

  const setCategoriesError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, categoriesError: error, categoriesLoading: false }));
  }, []);

  const setCategories = useCallback((categories: ICategory[]) => {
    setState(prev => ({
      ...prev,
      categories,
      categoriesLoading: false,
      categoriesError: null
    }));
  }, []);

  // Helpers para actualizar estado de producto individual
  const setProductLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, productLoading: loading }));
  }, []);

  const setProductError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, productError: error, productLoading: false }));
  }, []);

  const setCurrentProduct = useCallback((product: IProduct | null) => {
    setState(prev => ({
      ...prev,
      currentProduct: product,
      productLoading: false,
      productError: null
    }));
  }, []);

// ================== FUNCIONES PRINCIPALES ==================

// ================== FUNCIONES PRINCIPALES ==================

  // Obtener productos
  const getProducts = useCallback(async (): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      
      // const products = await apiProductos.getProductos();
      // setProducts(products);
      const products = await apiProductos.getProductos();
      setProducts(products);
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al cargar productos");
      return false;
    }
  }, [setProductsLoading, setProductsError, setProducts]);

  // Obtener categorías
  const getCategories = useCallback(async (): Promise<boolean> => {
    try {
      setCategoriesLoading(true);
      setCategoriesError(null);
      
      const categories = await apiCategorias.getCategoria();
      setCategories(categories);
      
      return true;
    } catch (error) {
      setCategoriesError(error instanceof Error ? error.message : "Error al cargar categorías");
      return false;
    }
  }, [setCategoriesLoading, setCategoriesError, setCategories]);

  // Obtener producto individual
  const getProduct = useCallback(async (id: number): Promise<boolean> => {
    try {
      setProductLoading(true);
      setProductError(null);
      
      const product = await apiProductos.getProductos(id);
      setCurrentProduct(product);
      
      return true;
    } catch (error) {
      setProductError(error instanceof Error ? error.message : "Error al cargar producto");
      return false;
    }
  }, [setProductLoading, setProductError, setCurrentProduct]);


   // Actualizar producto (solo admin)
  const updateProduct = useCallback(async (productData: IProduct): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      
      const updatedProduct = await apiProductos.editarProductos(productData);
      
      // Actualizar lista de productos
      setState(prev => ({
        ...prev,
        products: prev.products.map(p => 
          p.id === productData.id ? updatedProduct : p
        ),
        currentProduct: prev.currentProduct?.id === productData.id 
          ? updatedProduct 
          : prev.currentProduct,
        productsLoading: false,
        productsError: null
      }));
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al actualizar producto");
      return false;
    }
  }, [setProductsLoading, setProductsError]);



  // Buscar productos
 /* const searchProducts = useCallback(async (query: string): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      
      const products = await apiService.searchProducts(query);
      setProducts(products);
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error en la búsqueda");
      return false;
    }
  }, [setProductsLoading, setProductsError, setProducts]);
*/
  // ================== FUNCIONES ADMIN ==================

  // Crear producto (solo admin)
  /*const createProduct = useCallback(async (productData: Omit<Product, 'id'>): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      
      const newProduct = await apiService.createProduct(productData);
      
      // Actualizar lista de productos
      setState(prev => ({
        ...prev,
        products: [...prev.products, newProduct],
        productsLoading: false,
        productsError: null
      }));
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al crear producto");
      return false;
    }
  }, [setProductsLoading, setProductsError]);

  // Actualizar producto (solo admin)
  const updateProduct = useCallback(async (id: number, productData: Partial<Product>): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      
      const updatedProduct = await apiService.updateProduct(id, productData);
      
      // Actualizar lista de productos
      setState(prev => ({
        ...prev,
        products: prev.products.map(p => 
          p.id === id ? updatedProduct : p
        ),
        currentProduct: prev.currentProduct?.id === id 
          ? updatedProduct 
          : prev.currentProduct,
        productsLoading: false,
        productsError: null
      }));
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al actualizar producto");
      return false;
    }
  }, [setProductsLoading, setProductsError]);

  // Eliminar producto (solo admin)
  const deleteProduct = useCallback(async (id: number): Promise<boolean> => {
    try {
      setProductsLoading(true);
      setProductsError(null);
      
      await apiService.deleteProduct(id);
      
      // Actualizar lista de productos
      setState(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== id),
        currentProduct: prev.currentProduct?.id === id 
          ? null 
          : prev.currentProduct,
        productsLoading: false,
        productsError: null
      }));
      
      return true;
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al eliminar producto");
      return false;
    }
  }, [setProductsLoading, setProductsError]);
*/
  // Crear categoría (solo admin)
  // const createCategory = useCallback(async (categoryData: Omit<Category, 'id'>): Promise<boolean> => {
  //   try {
  //     setCategoriesLoading(true);
  //     setCategoriesError(null);
      
  //     const newCategory = await apiService.createCategory(categoryData);
      
  //     // Actualizar lista de categorías
  //     setState(prev => ({
  //       ...prev,
  //       categories: [...prev.categories, newCategory],
  //       categoriesLoading: false,
  //       categoriesError: null
  //     }));
      
  //     return true;
  //   } catch (error) {
  //     setCategoriesError(error instanceof Error ? error.message : "Error al crear categoría");
  //     return false;
  //   }
  // }, [setCategoriesLoading, setCategoriesError]);

 // ================== HELPERS ==================

  // Limpiar errores
  const clearProductsError = useCallback(() => {
    setProductsError(null);
  }, [setProductsError]);

  const clearCategoriesError = useCallback(() => {
    setCategoriesError(null);
  }, [setCategoriesError]);

  const clearProductError = useCallback(() => {
    setProductError(null);
  }, [setProductError]);

  // Reset estados
  const resetProducts = useCallback(() => {
    setState(prev => ({
      ...prev,
      products: [],
      productsLoading: false,
      productsError: null
    }));
  }, []);

  const resetCurrentProduct = useCallback(() => {
    setCurrentProduct(null);
  }, [setCurrentProduct]);

  // Verificar si un producto ya está en la lista
  // const hasProduct = useCallback((id: number): boolean => {
  //   return state.products.some(p => p.id === id);
  // }, [state.products]);

  return {
    // Estado
    ...state,
    
    // Funciones principales
    getProducts,
    getCategories,
    getProduct,
    // searchProducts,
    
    // Funciones admin
    // createProduct,
    // updateProduct,
    // deleteProduct,
    // createCategory,
    
    // Helpers
    clearProductsError,
    clearCategoriesError,
    clearProductError,
    resetProducts,
    resetCurrentProduct,
    // hasProduct,
  };
