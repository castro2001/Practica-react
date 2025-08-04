import { Welcome } from "~/Components/shared/Welcome/Welcome"; 
import type { Route } from "./+types/home"; 
import Logo from "~/assets/image/logo.png";
import { useAuth } from '~/context/Auth/authContext'; 
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {   
    return [     
        { title: "Home" },     
        { name: "description", content: "Welcome to React Router!" },   
    ]; 
}  

export default function Home() {  
      const { isAuthenticated, isLoading } = useAuth();
    const iWelcome : IWelcome= {
        title:"Bienvenido Usuario",
        descripcion:{
            content:"Bienvenido Usuario este es un proyecto de prueba, Se saca provecho a react  convirtiendo a un componente lo mas reutilizable posible"
        },
        image:Logo
    }  

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? 
    <Navigate to="/dashboard" replace /> : 
    <Navigate to="/login" replace />;
       
}