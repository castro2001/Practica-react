import type { Route } from "../+types/root";
import { DataGrid } from "~/Components/shared/DataGrid/DataGrid"; 
import { useFetch } from "~/hook/useFetchHook";
import { PageUsuarioDesktop } from "~/features/Usuario/desktop/page.usuario.desktop";
import { PageUsuarioMovil } from "~/features/Usuario/movil/page.usuario.movil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Usuarios" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Usuarios() {
    const { data, errors, isLoading } = useFetch<IUsuarios>("https://api.escuelajs.co/api/v1/users");    
    
    const actions:IActionsDataBody = {
        isStarred: true,
        isArchived:false,
        isDraft:false,
        isRead:false
    }
    // ✅ Verificar que data existe y es un array antes de usar map
    const usuarios: IUsuarios[] = data || [];
    
    const usuariosFilterConfig: IFilterConfig<IUsuarios> = {
        searchFields:['name','email','role']
    }

    const IdataGridProps : IDataGrid<IUsuarios> ={
        dataHeader:{
            title: "Usuarios",     
            btn_text: "Redactar",
            isSearch: true,
        },
        dataBody:{
            data:usuarios,
            isLoading:isLoading,
            errors:errors,
            renderDesktop: (usuarios) => (
                <PageUsuarioDesktop usuario={usuarios}  actions={actions} />
            ),
            
            renderMovil: (usuarios) => (
                <PageUsuarioMovil {... usuarios} />
            )
        },
        dataPaginator:{
            pagina:3
        },
        filterConfig:usuariosFilterConfig
    }
    
    return (     
        <>     
            <DataGrid  {...IdataGridProps} />     
        </>   
    ); 
}
