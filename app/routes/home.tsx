import { Welcome } from "~/Components/Welcome/Welcome"; 
import type { Route } from "./+types/home"; 
import Logo from "~/assets/image/logo.png";

export function meta({}: Route.MetaArgs) {   
    return [     
        { title: "Home" },     
        { name: "description", content: "Welcome to React Router!" },   
    ]; 
}  

export default function Home() {  
    const iWelcome : IWelcome= {
        title:"Bienvenido Usuario",
        descripcion:{
            content:"Bienvenido Usuario este es un proyecto de prueba, Se saca provecho a react  convirtiendo a un componente lo mas reutilizable posible"
        },
        image:Logo
    }  

    return (     
        <>                     
            <Welcome  {...iWelcome}/>      
        </>   
    );        
}