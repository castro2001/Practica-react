import { Welcome } from "~/Components/Welcome/Welcome";
import type { Route } from "./+types/home";
import { icons } from "lucide-react";
import {DataGrid} from "~/Components/DataGrid/DataGrid";
import { useFetch } from "~/hook/useFetchHook";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  const {data,error,isLoading}= useFetch("https://api.escuelajs.co/api/v1/products");

  const productos: IProduct[] = data;

  productos.map((item)=>{
    console.log( item.id + item.title);
  
   
    
    
  })

  console.log(data);
  

  const iDataHeader:IDataHeader ={
    title: "Bandeja de Entrada",
    btn_text:"Redactar"
  } 

  const descripcion:IDescription ={
    
  }
  // const iDataBody:IDataBody ={
    
  // }

  // const iDataPagintor: IDataPaginator={
  //   pagina:5,setDataFiltrada(IProduct)
  // }

  return (
    <>
    {/* <DataGrid      
    dataHeader={iDataHeader}
    dataBody ={iDataBody}
    dataPaginator ={iDataPagintor}
    />     */}

      <Welcome 
  title="Bienvenido Jordan"
  isIcon = {false}
  descripcion={descripcion}
  />
    </>
  )
  
 
  ;
}