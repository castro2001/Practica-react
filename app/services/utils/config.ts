interface IConfiguration{
    apiUrl: string;
}

export const config: IConfiguration = {
    apiUrl: import.meta.env.VITE_API_URL || 'https://api.escuelajs.co/api/v1',
};