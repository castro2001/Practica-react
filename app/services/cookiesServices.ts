// cookiesService.ts
class CookiesService {
  
  // Verificar si estamos en el navegador
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  public getToken(): string | null {
    if (!this.isBrowser()) {
      // En el servidor, no podemos acceder a document.cookie
      // Retornamos null o podrías implementar lógica para cookies del servidor
      return null;
    }
    
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1] || null;
  }

  public setToken(token: string): void {
    if (!this.isBrowser()) {
      // En el servidor no podemos establecer cookies del navegador
      console.warn('Cannot set cookie on server side');
      return;
    }

    const expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 días
    document.cookie = `auth_token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
  }

  public removeToken(): void {
    if (!this.isBrowser()) {
      console.warn('Cannot remove cookie on server side');
      return;
    }

    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  // Método adicional para obtener cookie por nombre
  public getCookieByName(name: string): string | null {
    if (!this.isBrowser()) {
      return null;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  // Método para verificar si las cookies están disponibles
  public areCookiesAvailable(): boolean {
    return this.isBrowser();
  }
}