import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useState } from "react";
import BackgroundDefault from "~/assets/image/background_default.png";

export const Welcome = (props: IWelcome) => {
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
  return (
  <section className="bg-white dark:bg-gray-800">
       <div className="container flex flex-col-reverse lg:flex-row items-center px-6 py-10 mx-auto gap-8">
         {/* CONTENIDO */}
         <div className="w-full lg:w-1/2">
           <div className="lg:max-w-lg">
             <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">
               {title}
             </h1>
 
             <div className="mt-8 space-y-5">
               <p className="text-gray-700 dark:text-gray-200">{content}</p>
 
               {isIcon && (
                 <p className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                   {icon} <span>{content}</span>
                 </p>
               )}
             </div>
           </div>
         </div>
 
         {/* SLIDER DE IMÁGENES */}
         <div className="w-full lg:w-1/2">
           <div className="relative">
             {/* Imagen actual */}
             <div className="relative overflow-hidden rounded-md">
               <img
                 className="object-contain w-full h-auto max-h-80 rounded-md transition-opacity duration-300"
                 src={imageArray[currentImageIndex]}
                 alt={`Imagen ${currentImageIndex + 1}`}
               />
 
               {/* Controles de navegación (solo si hay múltiples imágenes) */}
               {hasMultipleImages && (
                 <>
                   {/* Botón anterior */}
                   <button
                     onClick={prevImage}
                     className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
                     aria-label="Imagen anterior"
                   >
                     <ChevronLeft size={20} />
                   </button>
 
                   {/* Botón siguiente */}
                   <button
                     onClick={nextImage}
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
                     aria-label="Imagen siguiente"
                   >
                     <ChevronRight size={20} />
                   </button>
                 </>
               )}
             </div>
 
             {/* Paginación con círculos (solo si hay múltiples imágenes) */}
             {hasMultipleImages && (
               <div className="flex justify-center mt-4 space-x-2">
                 {imageArray.map((_, index) => (
                   <button
                     key={index}
                     onClick={() => goToImage(index)}
                     className={`w-3 h-3 rounded-full transition-all duration-200 ${
                       index === currentImageIndex
                         ? "bg-blue-600 dark:bg-blue-400"
                         : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                     }`}
                     aria-label={`Ir a imagen ${index + 1}`}
                   />
                 ))}
               </div>
             )}
 
             {/* Contador de imágenes (solo si hay múltiples imágenes) */}
             {hasMultipleImages && (
               <div className="text-center mt-2">
                 <span className="text-sm text-gray-500 dark:text-gray-400">
                   {currentImageIndex + 1} de {imageArray.length}
                 </span>
               </div>
             )}
           </div>
         </div>
       </div>
     </section>
  );
};
