import type { Route } from "../+types/root";
import { Welcome } from "~/Components/Welcome/Welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Productos" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Productos() {
    const description:IDescription ={

    } 

return <Welcome 
  title="Bienvenido Productos"
  isIcon = {false}
  descripcion={description}
  
  />;
}