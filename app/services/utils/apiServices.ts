import { type AxiosInstance, type InternalAxiosRequestConfig,type AxiosResponse, AxiosError, type AxiosRequestConfig} from "axios";
import axios from "axios";
import { config } from "./config";

export class ApiService{
    private static instance: ApiService | null = null;
    private apiUrl: AxiosInstance;

    private constructor() {
        this.apiUrl = axios.create({
            baseURL: config.apiUrl,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        // Interceptor para agregar token a cada solicitud
       // Interceptor para agregar token a cada solicitud
        this.apiUrl.interceptors.request.use(
            (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
                if (this.getToken() && request.headers) {
                    request.headers.Authorization = `Bearer ${this.getToken()}`;
                }
                return request;
            },
            (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
        );
        
        // Interceptor de respuesta para manejar errores
        this.apiUrl.interceptors.response.use(
            (response: AxiosResponse): AxiosResponse => response,
            (error: AxiosError): Promise<never> => {
                return this.handleError(error);
            }
        );
    
    }

    
    public static getInstance(): ApiService {
        if(!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    /*Manejo errores personalizados */
    private handleError(error: AxiosError): Promise<never> {
        if (!error.response) {
            console.error("🚨 Error de red:", error.message);
            return Promise.reject("Error de conexión. Verifica tu red.");
        }
    
        const { status, data } = error.response;
    
        switch (status) {
            case 401:
                console.warn("🔑 Token inválido o expirado.");
                break;
            case 403:
                console.error("🚫 Acceso denegado:", data);
                break;
            case 404:
                console.error("❌ Recurso no encontrado:", data);
                break;
            case 500:
                console.error("🔥 Error en el servidor:", data);
                break;
            default:
                console.error(`⚠️ Error ${status}:`, data);
        }
    
        return Promise.reject(data);
    }

    public async postMultipart<T>(url: string, data: FormData, config?: AxiosRequestConfig): Promise<T> {
        const headers = {
            "Accept": "application/json",
            "Authorization": `Bearer ${this.getToken()}`,
            'Content-Type': 'multipart/form-data',
            ...config?.headers,
        };

        try {
            const response = await this.apiUrl.post<T>(url, data, { headers });
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }    

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.apiUrl.get<T>(url, config).then(this.handleResponse<T>);
    }
    
    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.apiUrl.post<T>(url, data, config).then(this.handleResponse<T>);
    }
    
    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.apiUrl.put<T>(url, data, config).then(this.handleResponse<T>);
    }
    
    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.apiUrl.delete<T>(url, config).then(this.handleResponse<T>);
    }

    private handleResponse<T>(response: AxiosResponse<T>): T {
        return response.data;
    }

    /* Obtengo el token del api fake de platzi */
    protected getToken():  string | null {

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

    protected removeToken(): void {
        // this.cookies = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'auth_token=; expires=Thu, 5 Jan 2025 15:30:45   UTC; path=/;';
    }
}

export default ApiService.getInstance();