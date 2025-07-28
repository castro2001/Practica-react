import type { Route } from "../+types/root";
import { Welcome } from "~/Components/Welcome/Welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Usuarios" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Usuarios() {
 const description:IDescription ={
    
  } 
 return <Welcome 
  title="Bienvenido Usuario"
  isIcon = {false}
  descripcion={description}
  
  />;
}
