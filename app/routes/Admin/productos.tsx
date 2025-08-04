import type { Route } from "../../+types/root";

import { useEffect, useState } from "react";
import { DataGrid } from "~/Components/shared/DataGrid/DataGrid";

import { useApiContext } from "~/context/Data/ApiContext";
import { PageProductosDesktop } from "~/features/productos/desktop/page.productos.desktop";
import { PageProductosMovil } from "~/features/productos/movil/page.productos.movil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Productos" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Productos() {
    const {products,productsLoading,productsError,getProducts} = useApiContext();
  const [viewMode, setViewMode] = useState("table");
  const [isOpenModal,setIsOpenModal] = useState(false);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

    const actions:IActionsDataBody = {
        isStarred: true,
        isArchived:false,
        isDraft:false,
        isRead:false,
        viewMode:viewMode,
        setViewMode:setViewMode
    }
    
    
    const producto: IProduct[] =     products || [];

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
                isLoading:productsLoading,
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
