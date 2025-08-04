
const API_BASE = 'https://api.escuelajs.co/api/v1';

export class ProductoServices {
    
    private api:string;


    constructor(api_Base:string){
        this.api = api_Base;
       
    }

    private removeToken(): void {
        // this.cookies = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'auth_token=; expires=Thu, 5 Jan 2025 15:30:45   UTC; path=/;';
    }


    private getToken(): string | null {

        return document.cookie
        // return this.cookies
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1] || null;
    }

    async getProductos(): Promise < IProduct > {
        const token = this.getToken();
        if (!token) {
        throw new Error('No hay token de autenticación');
        }
    
        const response = await fetch(`${this.api}/products`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
        if (response.status === 401) {
            this.removeToken();
            throw new Error('Token expirado');
        }
        throw new Error('Error al obtener el perfil');
        }

        return await response.json();
    
    }
    async getProductoById(id:number): Promise < IProduct > {
        const token = this.getToken();
        if (!token) {
        throw new Error('No hay token de autenticación');
        }
    
        const response = await fetch(`${this.api}/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
        if (response.status === 401) {
            this.removeToken();
            throw new Error('Token expirado');
        }
        throw new Error('Error al obtener el perfil');
        }

        return await response.json();
    
    }

//     async fetchProducts (params?:ProductParams ) :Promise<IProduct[]> {
//         const searchParams = new URLSearchParams();
//         if (params?.categoryId) {
//         searchParams.append('categoryId', params.categoryId.toString());
//         }
//         if (params?.limit) {
//         searchParams.append('limit', params.limit.toString());
//         }
//         if (params?.offset) {
//         searchParams.append('offset', params.offset.toString());
//         }
//    if (searchParams.toString()) {
//       this.api += `?${searchParams.toString()}`;
//     }
//     }

}



// export const categoriaService = new CategoriaServices(API_BASE);

