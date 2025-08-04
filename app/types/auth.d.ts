interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token:string;

}


interface ProductParams{
  categoryId?: number;
  limit?: number;
  offset?: number;
}

// Tipos para el estado de categorías
interface CategoriaState {
  categorias: ICategory[] |null ;
  categoria: ICategory | null;
  productos: IProduct[]|null 
}


interface IAuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<boolean>;
    register: (data:RegisterData)=> Promise<boolean>;
    logout: ()=>void;
    refreshAuth: ()=> Promise<void>;
    hasRole: (role:string)=> boolean;
    hasAnyRole: (role:string[])=> boolean;
    getToken:()=>void
}

interface IApiContextState {
    // Products
  products: IProduct[];
  productsLoading: boolean;
  productsError: string | null;
  
  // Categories
  categories: ICategory[];
  categoriesLoading: boolean;
  categoriesError: string | null;
  
  // Single product (for details)
  currentProduct: IProduct | null;
  productLoading: boolean;
  productError: string | null;
}

type ApiAction =   // Products actions
   { type: 'FETCH_PRODUCTS_START' }
  | { type: 'FETCH_PRODUCTS_SUCCESS'; payload: Product[] }
  | { type: 'FETCH_PRODUCTS_ERROR'; payload: string }
  
  // Categories actions
  | { type: 'FETCH_CATEGORIES_START' }
  | { type: 'FETCH_CATEGORIES_SUCCESS'; payload: Category[] }
  | { type: 'FETCH_CATEGORIES_ERROR'; payload: string }
  
  // Single product actions
  | { type: 'FETCH_PRODUCT_START' }
  | { type: 'FETCH_PRODUCT_SUCCESS'; payload: Product }
  | { type: 'FETCH_PRODUCT_ERROR'; payload: string }
  
  // Admin actions
  | { type: 'CREATE_PRODUCT_SUCCESS'; payload: Product }
  | { type: 'UPDATE_PRODUCT_SUCCESS'; payload: Product }
  | { type: 'DELETE_PRODUCT_SUCCESS'; payload: number };