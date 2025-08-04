import type { Route } from "../../+types/root";
import { useProductLogic } from "~/logic/useProductos";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "~/Components/ui/ProductCard/ProductCard";
import { DataPaginator } from "~/Components/shared/DataGrid/DataPaginator/DataPaginator";
import { DataHeader } from "~/Components/shared/DataGrid/DataHeader/DataHeader";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Productos" },
    { name: "description", content: "Listado de productos disponibles" },
  ];
}

export default function Productos() {
  const { productos, getProductos, isLoading, error } = useProductLogic();
  const [viewMode, setViewMode] = useState("grid");
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;

  useEffect(() => {
    getProductos();
  }, [getProductos]);

  const productosFilterConfig: IFilterConfig<IProduct> = {
    customFilter: (producto, searchTerm) => {
      const term = searchTerm.toLowerCase();
      return (
        producto.title?.toLowerCase().includes(term) ||
        producto.category?.name?.toLowerCase().includes(term) ||
        producto.description?.toLowerCase().includes(term) 
      );
    },
  };

  const dataFiltrada = useMemo(() => {
    if (isLoading || error || !productos?.length) return [];
    let resultado = [...productos];

    if (terminoBusqueda && productosFilterConfig.customFilter) {
      resultado = resultado.filter((producto) =>
        productosFilterConfig.customFilter(producto, terminoBusqueda)
      );
    }

    return resultado;
  }, [productos, isLoading, error, productosFilterConfig, terminoBusqueda]);

  const totalElementos = dataFiltrada.length;
  const totalPaginas = Math.ceil(totalElementos / itemsPorPagina);

  const indiceInicio = (paginaActual - 1) * itemsPorPagina;
  const indiceFin = indiceInicio + itemsPorPagina;
  const dataPaginada = dataFiltrada.slice(indiceInicio, indiceFin);

  const dataheader: IDataHeader = {
    title: "Tienda de Productos",
    isIcon: true,
    icon: <ShoppingBag className="w-5 h-5 text-white" />,
    isBtn:false,
    terminoBusqueda,
    setTerminoBusqueda,
    isOptions:true,
    viewMode,
    setViewMode,
    
  };
  const datapaginator: IDataPaginator = {
    pagina: itemsPorPagina,
    paginaActual,
    setPaginaActual,
    totalElementos,
    totalPaginas,
  };



  return (
    <>
      <DataHeader {...dataheader} />

      {error && <p className="text-red-500">Ocurrió un error: {error}</p>}
      {isLoading && <p className="text-gray-500">Cargando productos...</p>}

      {!isLoading && totalElementos > itemsPorPagina && (
        <DataPaginator {...datapaginator} />
      )}

      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {dataPaginada.map((item) => (
          <ProductCard
            key={item.id}
            products={item}
            viewMode={viewMode}
            review={ 0}
            rating={ 0}
           redirect={`Detalle/${item.id}`}
          />
        ))}
      </div>
    </>
  );
}
