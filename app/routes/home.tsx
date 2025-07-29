import { Welcome } from "~/Components/Welcome/Welcome";
import type { Route } from "./+types/home";
import { icons } from "lucide-react";
import {DataGrid} from "~/Components/DataGrid/DataGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const iDataHeader:IDataHeader ={
    title: ""
  } 


  const iDataBody:IDataBody ={
    
  }

  const iDataPagintor: IDataPaginator={}

  return (
    <>
    <DataGrid      
    dataHeader={iDataHeader}
    dataBody ={iDataBody}
    dataPaginator ={iDataPagintor}
    />    
    </>
  )
  
  // <Welcome 
  // title="Bienvenido Jordan"
  // isIcon = {false}
  // descripcion={description}
  
  ;
}