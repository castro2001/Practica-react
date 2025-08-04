export class apiServices {
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
  // ================== PRODUCTOS ==================


}