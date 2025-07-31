import { Welcome } from "~/Components/shared/Welcome/Welcome";
import type { Route } from "./+types/home";
import Logo from "~/assets/image/background_default.png";
import { useParams, useLocation } from "react-router";
import { useFetch } from "~/hook/useFetchHook";
import { User, Package, Star, Tag, Calendar, DollarSign, Mail, Shield, ChevronLeft } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detalle " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Detalle() {
  const { tipo, id } = useParams();
  const location = useLocation();

  // Datos opcionales desde navegación
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

  // ✅ Función helper para validar si una URL de imagen es válida
  const isValidImageUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Verificar que la URL tenga un formato básico válido
    try {
      new URL(url);
    } catch {
      return false;
    }

    // Verificar que termine con una extensión de imagen común
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;
    return imageExtensions.test(url);
  };

  // ✅ Función helper para limpiar y validar URLs de imagen
  const cleanAndValidateImageUrl = (url: string): string => {
    if (!url || typeof url !== 'string') return Logo;
    
    // Limpiar URLs que vienen mal formateadas de la API
    let cleanUrl = url.trim();
    
    // Remover caracteres problemáticos al inicio y final
    cleanUrl = cleanUrl.replace(/^[\[\"\s]+|[\]\"\s]+$/g, '');
    
    // Si la URL no es válida, retornar Logo
    if (!isValidImageUrl(cleanUrl)) {
      return Logo;
    }
    
    return cleanUrl;
  };

  // ✅ Función helper para construir el contenido
  const buildContent = () => {
    if (!finalData) return "Cargando información...";

    switch (tipo) {
      case "Usuario":
        return `Perfil de ${finalData.name || 'Usuario'} • ${finalData.role || 'Sin rol'} • Contacto: ${finalData.email || 'No disponible'}`;

      case "Productos":
        return `${finalData.description || 'Sin descripción disponible'}`;

      default:
        return "Información no disponible";
    }
  };

  // ✅ Función helper mejorada para construir el array de imágenes
  const buildImages = (): string[] => {
    if (!finalData) return [Logo];

    switch (tipo) {
      case "Usuario":
        const avatarUrl = cleanAndValidateImageUrl(finalData.avatar);
        return [avatarUrl];

      case "Productos":
        const validImages: string[] = [];
        
        // Procesar imágenes del producto
        if (Array.isArray(finalData.images)) {
          finalData.images.forEach((img: any) => {
            const validUrl = cleanAndValidateImageUrl(img);
            validImages.push(validUrl);
          });
        }
        
        // Procesar imagen de categoría
        if (finalData.category?.image) {
          const categoryImageUrl = cleanAndValidateImageUrl(finalData.category.image);
          validImages.push(categoryImageUrl);
        }
        
        // Si no hay imágenes válidas, retornar Logo
        return validImages.length > 0 ? validImages : [Logo];

      default:
        return [Logo];
    }
  };

  // ✅ Construir la descripción
  const descripcion: IDescription = {
    content: buildContent(),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-64 mb-8"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900 dark:to-pink-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Error al cargar</h2>
            <p className="text-gray-600 dark:text-gray-300">No se pudieron cargar los datos solicitados.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header con botón de regreso */}
        <div className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:scale-105"
          >
            <ChevronLeft size={20} />
            <span className="font-medium">Volver</span>
          </button>
          <div className="flex items-center gap-3">
            {tipo === "Usuario" ? (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {tipo === "Usuario" ? "Perfil de Usuario" : "Detalles del Producto"}
            </h1>
          </div>
        </div>

        {finalData && tipo && (
          <>
            {/* Hero Section con Welcome */}
            <div className="mb-8">
              <Welcome 
                key={finalData.id || id}
                title={finalData.title || finalData.name || `Detalles de ${tipo}`} 
                descripcion={descripcion} 
                image={buildImages()}
              />
            </div>

            {/* Cards de información detallada */}
            {tipo === "Productos" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Card de Precio */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Precio</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Valor del producto</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ${finalData.price || 0}
                  </div>
                </div>

                {/* Card de Categoría */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Categoría</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Clasificación</p>
                    </div>
                  </div>
                  <div className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                    {finalData.category?.name || 'Sin categoría'}
                  </div>
                </div>

                {/* Card de Fechas */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Creado</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de registro</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {finalData.creationAt ? new Date(finalData.creationAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'No disponible'}
                  </div>
                </div>
              </div>
            )}

            {tipo === "Usuario" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Card de Información Personal */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Nombre</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Información personal</p>
                    </div>
                  </div>
                  <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {finalData.name || 'No disponible'}
                  </div>
                </div>

                {/* Card de Email */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Email</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Correo electrónico</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400 break-all">
                    {finalData.email || 'No disponible'}
                  </div>
                </div>

                {/* Card de Rol */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">Rol</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Permisos de usuario</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                    {finalData.role || 'Sin rol'}
                  </div>
                </div>
              </div>
            )}

            {/* Descripción completa en card separada */}
            {finalData.description && tipo === "Productos" && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  Descripción Completa
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {finalData.description}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {!finalData && !isLoading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No hay datos</h2>
            <p className="text-gray-600 dark:text-gray-300">No se encontraron datos para mostrar.</p>
          </div>
        )}
      </div>
    </div>
  );
}