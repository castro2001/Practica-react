import { Calendar, DollarSign, Star, Tag } from "lucide-react";
import { useNavigate } from "react-router";
import Logo from "~/assets/image/background_default.png";

export const ProductCard = (props: CardProduct) => {
  const {
    review,
    inStock=true,
    featured,
    viewMode,
    products,
    redirect,
    rating = 0,
    icono = <Star className="w-4 h-4 text-yellow-500 fill-current" />,
  } = props;

  const {
    id,
    title,
    slug,
    price = 0,
    description,
    category,
    images,
    creationAt,
    updateAt,
  } = products;

   const navigate = useNavigate();
    
      const handleClick=()=>{
        if(inStock){
          navigate(`${redirect}`); // ✅ Navegación con estado

        }
         
      }

  const formatDate = (dateString?: string) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("es-EC", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Fecha desconocida";
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-EC", {
      style: "currency",
      currency: "USD",
    });
  };



  return (
    <div
      key={id}
      className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {featured && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Destacado
        </div>
      )}

      <div
        className={`relative ${
          viewMode === "list" ? "w-64 flex-shrink-0 strech" : ""
        }`}
      >
        <img
          src={images?.[0] || Logo}
          alt={title}
          className={`w-full  ${
            viewMode === "list" ? " object-contain" : "h-56"
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = Logo;
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
          {icono}
        </div>
      </div>

      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
            {title}
          </h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {inStock ? "En Stock" : "Agotado"}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description || "Sin descripción disponible"}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-gray-500">({review ?? 0})</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {formatDate(creationAt)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(price)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            <Tag className="w-3 h-3" />
            {category?.name || "Sin categoría"}
          </div>
        </div>

        <button
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          disabled={!inStock}
          onClick={()=> inStock ? navigate(`${redirect}`):""}
        >
          {inStock ? "Ver Detalles" : "No Disponible"}
                    

        </button>
      </div>
    </div>
  );
};
