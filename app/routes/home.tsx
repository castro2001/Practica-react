import { Welcome } from "~/Components/Welcome/Welcome"; 
import type { Route } from "./+types/home"; 
import { icons } from "lucide-react"; 
import { DataGrid } from "~/Components/DataGrid/DataGrid"; 
import { useFetch } from "~/hook/useFetchHook";  

export function meta({}: Route.MetaArgs) {   
    return [     
        { title: "Home" },     
        { name: "description", content: "Welcome to React Router!" },   
    ]; 
}  

export default function Home() {    
    const { data, errors, isLoading } = useFetch("https://api.escuelajs.co/api/v1/products");    
    
    // ✅ Verificar que data existe y es un array antes de usar map
    const productos: IProduct[] = data || [];
    
    
    const iDataHeader: IDataHeader = {     
      title: "Bandeja de Entrada",     
      btn_text: "Redactar",
        isSearch: true,
    }     
    const iDataBody: IDataBody = {data: productos}
    
    const descripcion: IDescription = {        
    }   

    const iDataPagintor: IDataPaginatorConfig = {     
        pagina: 5   
        
    };
    
    // ✅ Mostrar estados de carga y error
    if (isLoading) {
        return <div>Cargando productos...</div>;
    }
    
    if (errors) {
        return <div>Error al cargar productos: {errors.message}</div>;
    }
    
    return (     
        <>     
            <DataGrid           
                dataHeader={iDataHeader}     
                dataBody={iDataBody}     
                dataPaginator={iDataPagintor}     
            />     
                    
            {/* <Welcome    
                title="Bienvenido Jordan"   
                isIcon={false}   
                descripcion={descripcion}   
            />      */}
        </>   
    );        
}