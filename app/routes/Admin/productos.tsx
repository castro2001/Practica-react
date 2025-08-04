import type { Route } from "../../+types/root";
import { DataGrid } from "~/Components/shared/DataGrid/DataGrid";
import { useFetch } from "~/hook/useFetchHook";
import { PageProductosDesktop } from "~/features/productos/desktop/page.productos.desktop";
import { PageProductosMovil } from "~/features/productos/movil/page.productos.movil";
import { useProductLogic } from "~/logic/useProductos";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Productos" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Productos() {
    // const { data, errors, isLoading } = useFetch<IProduct>("https://api.escuelajs.co/api/v1/products");
    // ✅ Verificar que data existe y es un array antes de usar map
      const { getProductos, productos, isLoading, error } = useProductLogic();
  const [viewMode, setViewMode] = useState("table");
  const [isOpenModal,setIsOpenModal] = useState(false);
        useEffect(() => {
        getProductos();
      }, [getProductos]);

    const actions:IActionsDataBody = {
        isStarred: true,
        isArchived:false,
        isDraft:false,
        isRead:false,
        viewMode:viewMode,
        setViewMode:setViewMode
    }
     const producto: IProduct[] = productos || [];

    const productosFilterConfig: IFilterConfig<IProduct> = {
        searchFields:[],
        // O usar filtro personalizado:
        customFilter: (producto, searchTerm) => {
        const term = searchTerm.toLowerCase();
        return producto.title?.toLowerCase().includes(term) ||
            producto.category?.name.toLowerCase().includes(term) ||
            producto.description.toLowerCase().includes(term);
        }
    };



    const IdataGridProps : IDataGrid<IProduct> ={
        dataHeader:{
            title: "Bandeja de Productos",
            btn_text: "Crear producto",
            isSearch: true,
            isOptions:true,
            viewMode,
            setViewMode,
            // modal:Modal
      
        },
        dataBody:{
            data:producto,
                isLoading:isLoading,
            errors:null,
                renderDesktop: (product) => (
                    <>
                    
                    <PageProductosDesktop  product={product}  actions={actions}  />
                    </>
                ),
                renderMovil: (product) => (
                <PageProductosMovil  product={product}  actions={actions}  />
                )
        },
        dataPaginator:{
            pagina:5
        },
        filterConfig:productosFilterConfig
    }

    return (
        <>
            <DataGrid  {...IdataGridProps} />
        </>
    );
}
