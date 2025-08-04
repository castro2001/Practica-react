import { CircleAlert, Edit, Eye, MoreHorizontal, Star, Trash2 } from "lucide-react";
import BackgroundDefault from "~/assets/image/background_default.png"
import { useNavigate } from "react-router";
import { Modal } from "~/Components/ui/Modal/Modal";
import { useState } from "react";

  interface PageProductosDesktopProps {
  product: IProduct;
  actions: IActionsDataBody;
}


export const PageProductosDesktop: React.FC<PageProductosDesktopProps> = ({ product, actions }) => {
  const { id, title, slug, price, description, category, images, creationAt, updateAt } = product;
  const { isStarred, isArchived, isDraft, isRead,viewMode="table",setViewMode } = actions;
  const navigate = useNavigate();
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleClick=()=>{
    navigate(`/Detalle/Productos/${id}`); 
  }
 const handleView = () => {
        navigate(`/dashboard/Productos/Detalle/${id}`, { state: { product } }); // ✅ Navegación con estado
  };

  const handleEdit = () => {
    navigate(`/productos/${id}/edit`);
  };

  const handleDelete = () => {
    // Lógica para eliminar
    console.log("Eliminar producto:", id);
  };
    const formatDate = (dateString?: string) =>
    dateString
      ? new Date(dateString).toLocaleDateString("es-EC", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Fecha desconocida"

    const formatPrice = (price: number) =>
    price.toLocaleString("es-EC", {
      style: "currency",
      currency: "USD",
    });

if(viewMode === "table"){
  // Asegúrate de que esté dentro del return del viewMode === "table"
return (
<>
   <div className="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group" key={id}>
      {/* ID */}
      <div className="w-16 flex-shrink-0">
        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
          {id}
        </span>
      </div>

      {/* Imagen */}
      <div className="w-20 flex-shrink-0">
        <img
          src={images?.[0] || BackgroundDefault}
          onError={(e) => ((e.target as HTMLImageElement).src = BackgroundDefault)}
          className="w-16 h-16 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200"
          alt={title}
        />
      </div>

      {/* Producto Info */}
      <div className="flex-1 min-w-0 px-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={title}>
            {title}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 flex-shrink-0">
            {category?.name || "General"}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1 mb-1">
          {description || "Sin descripción"}
        </p>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {formatDate(creationAt)}
        </span>
      </div>

      {/* Precio */}
      <div className="w-24 flex-shrink-0 text-right">
        <div className="text-lg font-bold text-green-600 dark:text-green-400">
          {formatPrice(price)}
        </div>
      </div>

      {/* Acciones */}
      <div className="w-32 flex-shrink-0 flex items-center justify-center space-x-1">
        <button
          onClick={handleView}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-110"
          title="Ver detalles"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={()=> setIsBasicModalOpen(true)}
          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 hover:scale-110"
          title="Editar"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={()=> setIsDeleteOpen(true)}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-110"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

<Modal 

isOpen={isBasicModalOpen}
  onClose={() => setIsBasicModalOpen(false)}
  title={`Modal Editar Productos ${id}`}
  size="sm">

<div className="text-center">
    <div className="mb-4">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
    {title}
    </h3>
    <p className="text-gray-500 dark:text-gray-50 mb-6">
      {description}
    </p>
    <button
      onClick={() => setIsBasicModalOpen(false)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
    >
      Entendido
    </button>
  </div>

  </Modal>


<Modal 

isOpen={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  title="Modal Eliminar"
  size="md">

<div className="text-center">
    <div className="mb-4">
      <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
  <CircleAlert className="h-6 w-6  dark:text-gray-200" />
      </div>
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
      {title}
    </h3>
  
    <button
      onClick={() => setIsDeleteOpen(false)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
    >
      Entendido
    </button>
  </div>

  </Modal>
</>
);

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
