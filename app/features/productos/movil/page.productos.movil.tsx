import { MoreHorizontal, Star } from "lucide-react";
import { useNavigate } from "react-router";
  import BackgroundDefault from "~/assets/image/background_default.png"

interface PageProductosDesktopProps {
  product: IProduct;
  actions: IActionsDataBody;
}

export const PageProductosMovil : React.FC<PageProductosDesktopProps> = ({ product, actions }) => {
     const { id, title, slug, price, description, category, images, creationAt, updateAt } = product;
  const { isStarred, isArchived, isDraft, isRead } = actions;
     const navigate = useNavigate();
    
      const handleClick=()=>{
    navigate(`/Detalle/Productos/${id}`, { state: { product } }); // ✅ Navegación con estado
      }
    return (
        <>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                        <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300  focus:ring-blue-500"
                        />
                        <button className="text-gray-400 hover:text-yellow-500 transition-colors duration-150">
                        <Star className="h-4 w-4" />
                        </button>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        NUEVO
                        </span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </div>

                {/* Contenido principal */}
            <div className="flex space-x-3 cursor-pointer" onClick={handleClick}>
                <img
                    alt="Product"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                src={images?.[0] || BackgroundDefault}
                onError={(e) => {
                    (e.target as HTMLImageElement).src = BackgroundDefault;
                }}
                />
                <div className="flex-1 min-w-0 space-y-2">
                    <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50 mb-1">
                        {category?.name || 'General'}
                    </p>
                    <h3 className="text-base font-bold text-gray-900 leading-tight dark:text-gray-100">
                        {title}
                    </h3>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 dark:text-gray-50">
                    {description}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                    <span className="text-xl font-bold text-blue-600 dark:text-gray-50">
                        ${price}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-50">
                        ID: {id}
                    </span>
                    </div>
                </div>
                </div>
        </>
    )

}