import { Welcome } from "~/Components/shared/Welcome/Welcome";
import type { Route } from "./+types/home";
import Logo from "~/assets/image/logo.png";
import { useParams, useLocation } from "react-router";
import { useFetch } from "~/hook/useFetchHook";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detalle " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Detalle() {
  const { tipo, id } = useParams();
  const location = useLocation();

  // Datos opcionales desde navegación (ej: desde una lista con navigate(..., { state: { data } }))
  const dataState = location.state?.data;

  // Mapa de endpoints
  const endpointMap: Record<string, string> = {
    Usuario: "https://api.escuelajs.co/api/v1/users/",
    Productos: "https://api.escuelajs.co/api/v1/products/",
  };

  // Carga dinámica sólo si no vino desde navegación
  const endpoint = tipo && id && !dataState ? `${endpointMap[tipo]}${id}` : "";
  const { data: fetchedData, errors, isLoading } = useFetch<any>(endpoint);
  const finalData = dataState || fetchedData;
console.log(finalData);

  // Si aún no hay datos, evita construir contenido JSX (para evitar errores)
  const descripcion: IDescription = {
    content: (() => {
      if (!finalData) return null;

      switch (tipo) {
        case "Usuario":
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
                Detalle de Usuario
              </h2>
              <p className="text-gray-700 dark:text-gray-100">
                <strong>Nombre:</strong> {finalData.name}
              </p>
              <p className="text-gray-700 dark:text-gray-100">
                <strong>Email:</strong> {finalData.email}
              </p>
              <p className="text-gray-700 dark:text-gray-100">
                <strong>Rol:</strong> {finalData.role}
              </p>
            </div>
          );

        case "Productos":
          return (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
                Detalle de Producto
              </h2>
              <p className="text-gray-700 dark:text-gray-100">
                <strong>Título:</strong> {finalData.title}
              </p>
              <p className="text-gray-700 dark:text-gray-100">
                <strong>Precio:</strong> ${finalData.price}
              </p>
              <p className="text-gray-700 dark:text-gray-100">
                <strong>Categoría:</strong> {finalData.category?.name}</p>
                 <p className="text-gray-700 dark:text-gray-100">
                <strong>Descripcion:</strong> {finalData.description}</p>
               
                            
               


         </div>
          
          );

        default:
          return <p className="text-gray-500">Tipo desconocido.</p>;
      }
    })(),
  };

  return (
    <div className="p-4 space-y-4">
      {isLoading && <p className="text-gray-500">Cargando...</p>}
      {errors && <p className="text-red-500">Error al cargar los datos.</p>}

      {finalData && tipo && (
        <Welcome title={`Detalles de ${tipo}`} descripcion={descripcion} image={tipo === "Usuario" ? finalData.avatar : finalData.images?.[0]} />
      )}

      {!finalData && !isLoading && (
        <p className="text-red-500">No se encontraron datos para mostrar.</p>
      )}
    </div>
  );
}
