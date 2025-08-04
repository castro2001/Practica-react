
const API_BASE = 'https://api.escuelajs.co/api/v1';

export class CategoriaServices {
    
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
    async getCategoria(): Promise < ICategory > {
        const token = this.getToken();
        if (!token) {
        throw new Error('No hay token de autenticación');
        }
    
        const response = await fetch(`${this.api}/categories`, {
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

}



// export const categoriaService = new CategoriaServices(API_BASE);

