import { useProductLogic } from "~/logic/useProductos";
import type { Route } from "./../+types/home";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import Logo from "~/assets/image/background_default.png";
import { useFetch } from "~/hook/useFetchHook";
import { User, Package, Star, Tag, Calendar, DollarSign, Mail, Shield, ChevronLeft } from "lucide-react";
import { Card } from "~/Components/ui/Card/Card";
import { Section } from "~/Components/Layout/Section/Section";
import { CardPreload } from "~/Components/ui/CardPreload/CardPreload";
import { themesProductos } from "~/data/themes/producto";
import { themesUsuarios } from "~/data/themes/usuario";
import { CardHeader } from "~/Components/ui/CardHeader/CardHeader";
import { Welcome } from "~/Components/shared/Welcome/Welcome"; 
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detalle " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Detalle() {
  const {  id } = useParams();
  const location = useLocation();
  const params:string = id || "";
  console.log(id)
  const [themeProducto1, themeProducto2, themeProducto3,themeProducto4] = themesProductos;

const {producto,getProductosById}= useProductLogic();
 
        useEffect(() => {
        getProductosById(params);
      }, [getProductosById]);

      console.log(producto)

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



  const descripcion : IDescription={
    content:producto?.description
  }


const builderImage = (): string[] => {
    if (!producto) return [Logo];
 const validImages: string[] = [];
      // Procesar imágenes del producto
        if (Array.isArray(producto.images)) {
          producto.images.forEach((img: any) => {
            const validUrl = cleanAndValidateImageUrl(img);
            validImages.push(validUrl);
          });
        }

             // Procesar imagen de categoría
        if (producto.category?.image) {
          const categoryImageUrl = cleanAndValidateImageUrl(producto.category.image);
          validImages.push(categoryImageUrl);
        }
        
        // Si no hay imágenes válidas, retornar Logo
        return validImages.length > 0 ? validImages : [Logo];;
}

   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header con botón de regreso */}
        <CardHeader
          titulo="Detalles"
          icon={<ChevronLeft className="w-6 h-6 text-gray-500" />}
          icono2={<Package className="w-6 h-6 text-white" />}
          iconotitulo={"Detalles del Producto"}


        />

        {
            producto && (
              
            <>
                     {/* Hero Section con Welcome */}
            <div className="mb-8">
                <Welcome 
                // key={producto.id }
                title='Detalles de productos'
                descripcion={descripcion} 
                image={builderImage()}
                />
            </div> 

            <Section 
              classNameContainer=""
              content={
                  <>

                    <Card  titulo="Precio" 
                    subtitulo="Valor del producto" 
                    icon={<DollarSign className="w-6 h-6 text-white" />} 
                    content={`${ producto.price || 0} `}
                    themes={themeProducto1}
                    />

                    <Card  titulo="Categoría" 
                    subtitulo="Clasificación" 
                    icon={<Tag className="w-6 h-6 text-white" />} 
                    content={producto.category?.name || 'Sin categoría'} 
                        themes={themeProducto2}
                    />

                    <Card  titulo="Creado" 
                    subtitulo="Fecha de registro" 
                    icon={<Calendar className="w-6 h-6 text-white" />} 
                    content={producto.creationAt ? new Date(producto.creationAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'No disponible'}
                        themes={themeProducto3}
                    />
                  </>  
              } />

            
            </>
                
            )
           
        }
  {producto?.description  && (
              <Card  titulo="Descripción Completas" 
              subtitulo="" 
              icon={<Star className="w-4 h-4 text-white" />} 
              content={producto.description}
              themes={themeProducto4}
              />

           
            )}

       
         {/* {!producto && !isLoading && ( 
          <CardPreload 
            titulo="No hay datos"
            subtitulo="No se encontraron datos para mostrar."
            icon={<Package className="w-8 h-8 text-gray-400" />}
          
          />
        
         )}  */}
      </div>
    </div>
  );
}