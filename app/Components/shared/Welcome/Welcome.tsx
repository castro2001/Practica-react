import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import BackgroundDefault from "~/assets/image/background_default.png";
import { useAuth } from "~/context/Auth/authContext";
import { useCategoriaLogic } from "~/logic/useCategoria";
import { getCookie } from "~/utils/cookies";

export const Welcome = (props: IWelcome) => {  
  const { getCategorias, categorias, isLoading, error } = useCategoriaLogic();

    useEffect(() => {
    getCategorias();
  }, [getCategorias]);

  const {
    title = "Título por defecto",
    descripcion,
    isIcon = false,
    image = BackgroundDefault,
  } = props;

  const {
    content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto minus perferendis amet perspiciatis corrupti totam?",
    icon,
  } = descripcion;


  console.log("autenticado",categorias);
    // Convertir images a array siempre
    const imageArray = Array.isArray(image) ? image : [image];
    const hasMultipleImages = imageArray.length > 1;
  
    // Estado para el slider
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    // Funciones para navegar el slider
    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % imageArray.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
    };
  
    const goToImage = (index: number) => {
      setCurrentImageIndex(index);
    };

    useEffect(()=>{
      if(!hasMultipleImages) return;
      const loop  = setInterval(()=>{
        setCurrentImageIndex((prev)=> (prev + 1 ) % imageArray.length )
      },1000)

      return ()=> clearInterval(loop);
    },[imageArray.length, hasMultipleImages])


  return (
  <section className="bg-white dark:bg-gray-900 rounded-3xl  shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
    <div className="container flex flex-col-reverse lg:flex-row items-center px-8 py-12 mx-auto">
      {/* CONTENIDO */}
      <div className="w-full lg:w-1/2 lg:pr-12">
        <div className="lg:max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-6xl leading-tight">
            {title}
          </h1>
          
          <div className="mt-8 space-y-6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {content}
              </p>
            </div>
            
            {isIcon && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                  {icon}
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SLIDER DE IMÁGENES MEJORADO */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
        <div className="relative max-w-lg mx-auto">
          {/* Contenedor principal de la imagen */}
          <div className="relative group">
            {/* Imagen actual con efectos mejorados */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br cursor-pointer from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <img
                className="object-fill w-full h-80 lg:h-96 transition-all duration-500 group-hover:scale-105 cursor-pointer"
                src={imageArray[currentImageIndex]}
                alt={`Imagen ${currentImageIndex + 1}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = BackgroundDefault; // Fallback si falla la imagen
                }}
              />
              
              {/* Overlay sutil en hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Controles de navegación mejorados */}
              {hasMultipleImages && (
                <>
                  {/* Botón anterior */}
                  <button
                    onClick={prevImage}
                    className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  {/* Botón siguiente */}
                  <button
                    onClick={nextImage}
                    className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Contador de imágenes en la esquina */}
              {hasMultipleImages && (
                <div className="absolute top-4 right-4 cursor-pointer bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                  {currentImageIndex + 1} / {imageArray.length}
                </div>
              )}
            </div>

            {/* Decoración de fondo */}
            <div className="absolute -inset-4 bg-gradient-to-r cursor-pointer from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Paginación con puntos mejorados */}
          {hasMultipleImages && (
            <div className="flex justify-center mt-8 space-x-3 cursor-pointer">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`transition-all duration-300 rounded-full  ${
                    index === currentImageIndex
                      ? "w-8 h-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
                      : "w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-125"
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Miniaturas en la parte inferior (opcional, solo si hay múltiples imágenes) */}
          {hasMultipleImages && imageArray.length <= 5 && (
            <div className="flex justify-center mt-6 space-x-3 overflow-hidden pb-2 cursor-pointer">
              {imageArray.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 transition-all duration-300 rounded-2xl overflow-hidden ${
                    index === currentImageIndex
                      ? "ring-4 ring-blue-500 dark:ring-blue-400 scale-110"
                      : "ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600 hover:scale-105"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    className="w-16 h-16 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = BackgroundDefault;
                    }}
                  />
                  {index !== currentImageIndex && (
                    <div className="absolute inset-0 bg-black/30" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
  );
};
