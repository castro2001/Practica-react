import { ApiService } from "../utils/apiServices";

export class ProductosService{
    private api: ApiService;
    constructor() {
        this.api = ApiService.getInstance();
    }

    async getProductos(id:string= ''): Promise<IProduct> {
        try {
            const url = id !='' ? `/products/${id}` : '/products';
            const response = await this.api.get<IProduct>(url)
            return await response;
        } catch (error) {
            throw error;
        }
        
    
    }

    async createProductos(data:IProduct): Promise<IProduct> {
        try {
            // const url = id !='' ? `/products/${id}` : '/products';
            const response = await this.api.post<IProduct>('/products',data)
            return await response;
        } catch (error) {
            throw error;
        }
      
    }
    
    async editarProductos(data:IProduct): Promise<IProduct> {
        try {
            // const url = id !='' ? `/products/${id}` : '/products';
            const response = await this.api.post<IProduct>('/products',data.id)
            return await response;
        } catch (error) {
            throw error;
        }
      
    }
    

    async removerProductos(id:number): Promise<IProduct> {
        try {
            const response = await this.api.delete<IProduct>(`/products/${id}`)
            return await response;
        } catch (error) {
            throw error;
        }
        
    
    }

}

export const productoServices = new ProductosService();