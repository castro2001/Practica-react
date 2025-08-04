// utils/cookies.ts - SSR Safe


export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

 return document.cookie
    // return this.cookies
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1] || null;
 
}


export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('Cannot set cookie on server side');
    return;
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
}

export function removeToken(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('Cannot remove cookie on server side');
    return;
  }

  // Fecha en el pasado para eliminar la cookie
  document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export function removeCookie(name: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('Cannot remove cookie on server side');
    return;
  }

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

