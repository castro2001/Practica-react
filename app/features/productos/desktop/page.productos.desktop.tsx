import { MoreHorizontal, Star } from "lucide-react";
  import BackgroundDefault from "~/assets/image/background_default.png"


  interface PageProductosDesktopProps {
  product: IProduct;
  actions: IActionsDataBody;
}


export const PageProductosDesktop: React.FC<PageProductosDesktopProps> = ({ product, actions }) => {
  const { id, title, slug, price, description, category, images, creationAt, updateAt } = product;
  const { isStarred, isArchived, isDraft, isRead } = actions;

  return (
    <>
      <div className="flex items-center space-x-4">
        <span className="font-bold text-gray-500">{title}</span>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 flex-shrink-0"
        />
        <button
          className={`transition-colors duration-150 ease-in-out ${
            isStarred ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"
          }`}
        >
          <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
        </button>
        <img
          alt="Product"
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          src={images?.[0] || BackgroundDefault}
          onError={(e) => {
            (e.target as HTMLImageElement).src = BackgroundDefault;
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-semibold text-gray-900 truncate dark:text-gray-50">
              {category?.name || "General"}
            </span>
            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              NUEVO
            </span>
          </div>
          <p className="text-gray-800 font-medium truncate mb-1 dark:text-gray-50">{title}</p>
          <p className="text-gray-600 text-sm truncate dark:text-gray-50">{description}</p>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-50">${price}</span>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};
