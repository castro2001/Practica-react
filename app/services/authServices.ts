
const  API_BASE = 'https://api.escuelajs.co/api/v1';

class AuthService {
  private api:string;

  constructor(api_Base:string){
      this.api = api_Base
  }

  public getTokenValue ():string | null{
    return this.getToken();
  }

  private getToken(): string | null {
    
    return document.cookie
    // return this.cookies
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1] || null;
  }

  private setToken(token: string): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días
    // this.cookies = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const secureFlag = isLocalhost ? '' : 'Secure;';

document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; ${secureFlag} SameSite=Strict`;



  }

  private removeToken(): void {
    // this.cookies = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'auth_token=; expires=Thu, 5 Jan 2025 15:30:45   UTC; path=/;';
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await fetch(`${this.api}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el login');
    }

    const data = await response.json();
    this.setToken(data.access_token);
    
    // Obtener perfil del usuario
    const user = await this.getProfile();
    return { user, token: data.access_token };
  }

  async register(userData: RegisterData): Promise<User> {
    const response = await fetch(`${this.api}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        avatar: userData.avatar || 'https://i.pravatar.cc/300',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el registro');
    }

    return await response.json();
  }

  async getProfile(): Promise<User> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${this.api}/auth/profile`, {
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

  async refreshToken(): Promise<User | null> {
    try {
      return await this.getProfile();
    } catch (error) {
      this.removeToken();
      return null;
    }
  }

  logout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService(API_BASE);