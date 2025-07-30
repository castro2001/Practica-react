import type { Route } from "../+types/root";
import { DataGrid } from "~/Components/DataGrid/DataGrid"; 
import { useFetch } from "~/hook/useFetchHook";
import { PageUsuarioDesktop } from "~/pages/Usuario/desktop/page.usuario.desktop";
import { PageUsuarioMovil } from "~/pages/Usuario/movil/page.usuario.movil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Usuarios" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Usuarios() {
    const { data, errors, isLoading } = useFetch<IUsuarios>("https://api.escuelajs.co/api/v1/users");    
    
    // ✅ Verificar que data existe y es un array antes de usar map
    const usuarios: IUsuarios[] = data || [];
    
    const IdataGridProps : IDataGrid<IUsuarios> ={
        dataHeader:{
            title: "Usuarios",     
            btn_text: "Redactar",
            isSearch: false,
        },
        dataBody:{
            data:usuarios,
            renderDesktop: (usuarios) => (
                <PageUsuarioDesktop {... usuarios} />
            ),
            
            renderMovil: (usuarios) => (
                <PageUsuarioMovil {... usuarios} />
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
