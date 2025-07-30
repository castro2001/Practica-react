import { DataBodyDesktop } from "~/Components/DataGrid/DataBody/view/DataBody.desktop";
import type { Route } from "../+types/root";
import { DataGrid } from "~/Components/DataGrid/DataGrid"; 
import { useFetch } from "~/hook/useFetchHook";
import { DataBodyMovil } from "~/Components/DataGrid/DataBody/view/DataBody.movil";
import { PageProductosDesktop } from "~/pages/productos/desktop/page.productos.desktop";
import { PageProductosMovil } from "~/pages/productos/movil/page.productos.movil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Productos" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Productos() {
    const { data, errors, isLoading } = useFetch<IProduct>("https://api.escuelajs.co/api/v1/products");    
    // ✅ Verificar que data existe y es un array antes de usar map
    const productos: IProduct[] = data || [];
    
    const IdataGridProps : IDataGrid<IProduct> ={
        dataHeader:{
            title: "Bandeja de Productos",     
            btn_text: "Redactar",
            isSearch: true,
        },
        dataBody:{
            data:productos,
                renderDesktop: (product) => (
                    <PageProductosDesktop {... product} />
                ),
                renderMovil: (product) => (
               <PageProductosMovil {... product} />
                )
        },
        dataPaginator:{
            pagina:5
        }
    }
    
    // ✅ Mostrar estados de carga y error
    if (isLoading) {
        return <div>Cargando productos...</div>;
    }
    
    if (errors) {
        return <div>Error al cargar productos: {errors.message}</div>;
    }
    
    return (     
        <>     
            <DataGrid  {...IdataGridProps} />     
        </>   
    ); 
}