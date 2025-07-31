import { MoreHorizontal, Star } from "lucide-react";
import BackgroundDefault from "~/assets/image/background_default.png"
import { useNavigate } from "react-router";

  interface PageProductosDesktopProps {
  product: IProduct;
  actions: IActionsDataBody;
}


export const PageProductosDesktop: React.FC<PageProductosDesktopProps> = ({ product, actions }) => {
  const { id, title, slug, price, description, category, images, creationAt, updateAt } = product;
  const { isStarred, isArchived, isDraft, isRead } = actions;
  const navigate = useNavigate();

  const handleClick=()=>{
    navigate(`/Detalle/Productos/${id}`, { state: { product } }); // ✅ Navegación con estado
  }


  return (
    <>
   <div className="hidden md:flex items-center p-4 space-x-4">
      {/* Controles */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <button className={`transition-all duration-200 ${isStarred ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`}>
          <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Imagen */}
      <img
        alt="Product"
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        src={images?.[0] || BackgroundDefault}
        onError={(e) => (e.target as HTMLImageElement).src = BackgroundDefault}
      />

      {/* Contenido */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={handleClick}>
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
            NUEVO
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {category?.name || "General"}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {description}
        </p>
      </div>

      {/* Precio y acciones */}
      <div className="flex items-center space-x-4 flex-shrink-0">
        <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
          ${price}
        </span>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
    </>
  );
};
