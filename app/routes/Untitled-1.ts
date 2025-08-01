// types/detail.types.ts
export interface DetailConfig {
  endpoint: string;
  buildContent: (data: any) => string;
  buildImages: (data: any, cleanImageFn: (url: string) => string, defaultLogo: string) => string[];
  getCards: (data: any, themes: any[]) => JSX.Element[];
  getHeaderConfig: () => {
    icon: JSX.Element;
    title: string;
  };
}

export interface DetailData {
  id?: string | number;
  name?: string;
  title?: string;
  description?: string;
  email?: string;
  role?: string;
  price?: number;
  category?: {
    name?: string;
    image?: string;
  };
  images?: string[];
  avatar?: string;
  creationAt?: string;
}

// utils/imageUtils.ts
export class ImageValidator {
  private static readonly IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i;

  static isValidImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    try {
      new URL(url);
    } catch {
      return false;
    }

    return this.IMAGE_EXTENSIONS.test(url);
  }

  static cleanAndValidateImageUrl(url: string, fallbackLogo: string): string {
    if (!url || typeof url !== 'string') return fallbackLogo;
    
    let cleanUrl = url.trim();
    cleanUrl = cleanUrl.replace(/^[\[\"\s]+|[\]\"\s]+$/g, '');
    
    return this.isValidImageUrl(cleanUrl) ? cleanUrl : fallbackLogo;
  }
}

// config/detailConfigs.ts
import { User, Package, DollarSign, Tag, Calendar, Star } from "lucide-react";
import { Card } from "~/Components/ui/Card/Card";
import { ImageValidator } from "~/utils/imageUtils";
import type { DetailConfig, DetailData } from "~/types/detail.types";

export const detailConfigs: Record<string, DetailConfig> = {
  Usuario: {
    endpoint: "https://api.escuelajs.co/api/v1/users/",
    
    buildContent: (data: DetailData) => 
      `Perfil de ${data.name || 'Usuario'} • ${data.role || 'Sin rol'} • Contacto: ${data.email || 'No disponible'}`,
    
    buildImages: (data: DetailData, cleanImageFn, defaultLogo) => {
      const avatarUrl = cleanImageFn(data.avatar || '', defaultLogo);
      return [avatarUrl];
    },
    
    getCards: (data: DetailData, themes: any[]) => {
      const [theme1, theme2, theme3] = themes;
      return [
        <Card 
          key="name"
          titulo="Nombre" 
          subtitulo="Información personal" 
          icon={<User className="w-6 h-6 text-white" />} 
          content={data.name || 'No disponible'} 
          themes={theme1}
        />,
        <Card 
          key="email"
          titulo="Email" 
          subtitulo="Correo Electrónico" 
          icon={<User className="w-6 h-6 text-white" />} 
          content={data.email || 'No disponible'} 
          themes={theme2}
        />,
        <Card 
          key="role"
          titulo="Rol" 
          subtitulo="Permiso de usuario" 
          icon={<User className="w-6 h-6 text-white" />} 
          content={data.role || 'No disponible'} 
          themes={theme3}
        />
      ];
    },
    
    getHeaderConfig: () => ({
      icon: <User className="w-5 h-5 text-white" />,
      title: "Perfil de Usuario"
    })
  },

  Productos: {
    endpoint: "https://api.escuelajs.co/api/v1/products/",
    
    buildContent: (data: DetailData) => 
      data.description || 'Sin descripción disponible',
    
    buildImages: (data: DetailData, cleanImageFn, defaultLogo) => {
      const validImages: string[] = [];
      
      if (Array.isArray(data.images)) {
        data.images.forEach((img: any) => {
          const validUrl = cleanImageFn(img, defaultLogo);
          validImages.push(validUrl);
        });
      }
      
      if (data.category?.image) {
        const categoryImageUrl = cleanImageFn(data.category.image, defaultLogo);
        validImages.push(categoryImageUrl);
      }
      
      return validImages.length > 0 ? validImages : [defaultLogo];
    },
    
    getCards: (data: DetailData, themes: any[]) => {
      const [theme1, theme2, theme3, theme4] = themes;
      const cards = [
        <Card 
          key="price"
          titulo="Precio" 
          subtitulo="Valor del producto" 
          icon={<DollarSign className="w-6 h-6 text-white" />} 
          content={data.price || 0} 
          themes={theme1}
        />,
        <Card 
          key="category"
          titulo="Categoría" 
          subtitulo="Clasificación" 
          icon={<Tag className="w-6 h-6 text-white" />} 
          content={data.category?.name || 'Sin categoría'} 
          themes={theme2}
        />,
        <Card 
          key="created"
          titulo="Creado" 
          subtitulo="Fecha de registro" 
          icon={<Calendar className="w-6 h-6 text-white" />} 
          content={data.creationAt ? new Date(data.creationAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'No disponible'}
          themes={theme3}
        />
      ];

      // Agregar descripción completa si existe
      if (data.description && theme4) {
        cards.push(
          <Card 
            key="description"
            titulo="Descripción Completa" 
            subtitulo="" 
            icon={<Star className="w-4 h-4 text-white" />} 
            content={data.description}
            themes={theme4}
          />
        );
      }

      return cards;
    },
    
    getHeaderConfig: () => ({
      icon: <Package className="w-6 h-6 text-white" />,
      title: "Detalles del Producto"
    })
  }
};

// hooks/useDetailData.ts
import { useFetch } from "~/hook/useFetchHook";

interface UseDetailDataProps {
  tipo: string;
  id: string;
  dataState?: any;
}

export const useDetailData = ({ tipo, id, dataState }: UseDetailDataProps) => {
  const config = detailConfigs[tipo];
  const endpoint = config && id && !dataState ? `${config.endpoint}${id}` : "";
  
  const { data: fetchedData, errors, isLoading } = useFetch<any>(endpoint);
  const finalData = dataState || fetchedData;

  return {
    data: finalData,
    config,
    errors,
    isLoading
  };
};

// components/DetailRenderer.tsx
import React from 'react';
import { Welcome } from "~/Components/shared/Welcome/Welcome";
import { Section } from "~/Components/Layout/Section/Section";
import { ImageValidator } from "~/utils/imageUtils";
import Logo from "~/assets/image/background_default.png";
import type { DetailConfig, DetailData } from "~/types/detail.types";

interface DetailRendererProps {
  data: DetailData;
  config: DetailConfig;
  tipo: string;
  id: string;
  themes: any[];
}

export const DetailRenderer: React.FC<DetailRendererProps> = ({ 
  data, 
  config, 
  tipo, 
  id, 
  themes 
}) => {
  const cleanImageFn = (url: string) => ImageValidator.cleanAndValidateImageUrl(url, Logo);
  
  const descripcion = {
    content: config.buildContent(data)
  };

  const images = config.buildImages(data, cleanImageFn, Logo);
  const cards = config.getCards(data, themes);

  return (
    <>
      <div className="mb-8">
        <Welcome 
          key={data.id || id}
          title={data.title || data.name || `Detalles de ${tipo}`} 
          descripcion={descripcion} 
          image={images}
        />
      </div>

      <Section 
        classNameContainer=""
        content={<>{cards}</>}
      />
    </>
  );
};

// Componente principal refactorizado
import { Welcome } from "~/Components/shared/Welcome/Welcome";
import type { Route } from "./+types/home";
import Logo from "~/assets/image/background_default.png";
import { useParams, useLocation } from "react-router";
import { ChevronLeft, Package } from "lucide-react";
import { CardPreload } from "~/Components/ui/CardPreload/CardPreload";
import { CardHeader } from "~/Components/ui/CardHeader/CardHeader";
import { themesProductos } from "~/data/themes/producto";
import { themesUsuarios } from "~/data/themes/usuario";
import { useDetailData } from "~/hooks/useDetailData";
import { DetailRenderer } from "~/components/DetailRenderer";
import { detailConfigs } from "~/config/detailConfigs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Detalle " },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Detalle() {
  const { tipo, id } = useParams<{ tipo: string; id: string }>();
  const location = useLocation();
  
  if (!tipo || !id) {
    return <div>Parámetros inválidos</div>;
  }

  const { data, config, errors, isLoading } = useDetailData({
    tipo,
    id,
    dataState: location.state?.data
  });

  const themes = tipo === "Usuario" ? themesUsuarios : themesProductos;

  // Loading state
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

  // Error state
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

  const headerConfig = config?.getHeaderConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <CardHeader
          titulo="Detalles"
          icon={<ChevronLeft className="w-6 h-6 text-gray-500" />}
          icono2={headerConfig?.icon}
          iconotitulo={headerConfig?.title}
        />

        {data && config ? (
          <DetailRenderer 
            data={data}
            config={config}
            tipo={tipo}
            id={id}
            themes={themes}
          />
        ) : (
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