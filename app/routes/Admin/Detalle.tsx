import { Welcome } from "~/Components/shared/Welcome/Welcome";
import type { Route } from "../+types/home";
import Logo from "~/assets/image/background_default.png";
import { useParams, useLocation } from "react-router";
import { useFetch } from "~/hook/useFetchHook";
import { User, Package, Star, Tag, Calendar, DollarSign, Mail, Shield, ChevronLeft } from "lucide-react";
import { Card } from "~/Components/ui/Card/Card";
import { Section } from "~/Components/Layout/Section/Section";
import { CardPreload } from "~/Components/ui/CardPreload/CardPreload";
import { themesProductos } from "~/data/themes/producto";
import { themesUsuarios } from "~/data/themes/usuario";
import { CardHeader } from "~/Components/ui/CardHeader/CardHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detalle " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Detalle() {
  const { tipo, id } = useParams();
  const location = useLocation();
 
  const [themeUsuario1,themeUsuario2,themeUsuario3]= themesUsuarios
  const [themeProducto1, themeProducto2, themeProducto3,themeProducto4] = themesProductos;

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
        <CardHeader
          titulo="Detalles"
          icon={<ChevronLeft className="w-6 h-6 text-gray-500" />}
          icono2={tipo === "Usuario" ?<User className="w-5 h-5 text-white" /> : <Package className="w-6 h-6 text-white" />}
          iconotitulo={tipo === "Usuario" ? "Perfil de Usuario" : "Detalles del Producto"}


        />

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
              <Section 
              classNameContainer=""
              content={
                  <>

                    <Card  titulo="Precio" 
                    subtitulo="Valor del producto" 
                    icon={<DollarSign className="w-6 h-6 text-white" />} 
                    content={ finalData.price || 0} 
                    themes={themeProducto1}
                    />

                    <Card  titulo="Categoría" 
                    subtitulo="Clasificación" 
                    icon={<Tag className="w-6 h-6 text-white" />} 
                    content={finalData.category?.name || 'Sin categoría'} 
                        themes={themeProducto2}
                    />

                    <Card  titulo="Creado" 
                    subtitulo="Fecha de registro" 
                    icon={<Calendar className="w-6 h-6 text-white" />} 
                    content={finalData.creationAt ? new Date(finalData.creationAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'No disponible'}
                        themes={themeProducto3}
                    />
                  </>  
              } />

              
            )}

            {tipo === "Usuario" && (
               <Section 
              classNameContainer=""
              content={
                  <>
                  <Card  titulo="Nombre" 
                  subtitulo="Información personal" 
                  icon={<User className="w-6 h-6 text-white" />} 
                  content={finalData.name || 'No disponible'} 
                  themes={themeUsuario1}
                  />

                  <Card  titulo="Email" 
                  subtitulo="Correo Electrónico" 
                  icon={<User className="w-6 h-6 text-white" />} 
                  content={finalData.email || 'No disponible'} 
                     themes={themeUsuario2}
                  />
            
                  <Card  titulo="Rol" 
                  subtitulo="Permiso de usuario" 
                  icon={<User className="w-6 h-6 text-white" />} 
                  content={finalData.role || 'No disponible'} 
                     themes={themeUsuario3}
                  />
                   </>  
              } />
            )}

            {/* Descripción completa en card separada */}
            {finalData.description && tipo === "Productos" && (
              <Card  titulo="Descripción Completas" 
              subtitulo="" 
              icon={<Star className="w-4 h-4 text-white" />} 
              content={finalData.description}
              themes={themeProducto4}
              />

           
            )}
          </>
        )}

        {!finalData && !isLoading && (
          <CardPreload 
            titulo="No hay datos"
            subtitulo="No se encontraron datos para mostrar."
            icon={<Package className="w-8 h-8 text-gray-400" />}
          
          />
        
        )}
      </div>
    </div>
  );
}