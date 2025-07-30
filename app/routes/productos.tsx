import type { Route } from "../+types/root";
import { DataGrid } from "~/Components/shared/DataGrid/DataGrid"; 
import { useFetch } from "~/hook/useFetchHook";
import { PageProductosDesktop } from "~/features/productos/desktop/page.productos.desktop";
import { PageProductosMovil } from "~/features/productos/movil/page.productos.movil";

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

    const actions:IActionsDataBody = {
        isStarred: true,
        isArchived:false,
        isDraft:false,
        isRead:false
    }
    
    const IdataGridProps : IDataGrid<IProduct> ={
        dataHeader:{
            title: "Bandeja de Productos",     
            btn_text: "Redactar",
            isSearch: true,
        },
        dataBody:{
            data:productos,
                renderDesktop: (product) => (
                    <PageProductosDesktop  product={product}  actions={actions} />
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