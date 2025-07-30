import React, { useState } from 'react';
import { Search, Archive, Trash2, Tag, Star, Clock, MoreHorizontal, RotateCcw, Settings, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface InboxItem {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  image: string;
  isStarred: boolean;
  isRead: boolean;
  time: string;
  badge?: string;
}

const inboxData: InboxItem[] = [
  {
    id: '1',
    category: "men's clothing",
    categoryColor: 'bg-blue-100 text-blue-800',
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    image: "/api/placeholder/48/48",
    isStarred: false,
    isRead: false,
    time: "Hoy",
    badge: "NUEVO"
  },
  {
    id: '2',
    category: "men's clothing",
    categoryColor: 'bg-blue-100 text-blue-800',
    title: "Mens Casual Premium Slim Fit T-Shirts",
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Sold stitched shirts with round neck made for durability and a...",
    image: "/api/placeholder/48/48",
    isStarred: true,
    isRead: false,
    time: "Hoy",
    badge: "NUEVO"
  },
  {
    id: '3',
    category: "men's clothing",
    categoryColor: 'bg-blue-100 text-blue-800',
    title: "Mens Cotton Jacket",
    description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your...",
    image: "/api/placeholder/48/48",
    isStarred: false,
    isRead: true,
    time: "Hoy",
    badge: "NUEVO"
  },
  {
    id: '4',
    category: "men's clothing",
    categoryColor: 'bg-blue-100 text-blue-800',
    title: "Mens Casual Slim Fit",
    description: "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description...",
    image: "/api/placeholder/48/48",
    isStarred: false,
    isRead: true,
    time: "Hoy"
  },
  {
    id: '5',
    category: "jewelery",
    categoryColor: 'bg-purple-100 text-purple-800',
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    image: "/api/placeholder/48/48",
    isStarred: true,
    isRead: false,
    time: "Hoy",
    badge: "NUEVO"
  }
];

export default function DataGrid() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [viewMode, setViewMode] = useState<'comfortable' | 'compact'>('comfortable');

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(inboxData.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleStar = (id: string) => {
    // En una app real, aquí actualizarías el estado del item
    console.log(`Toggle star for item ${id}`);
  };

  const filteredData = inboxData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 ">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Bandeja de Entrada
            </h1>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>Componer</span>
              </button>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar mensajes, contactos o archivos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all"
            />
          </div>
        </div>

        {/* Enhanced Toolbar */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Seleccionar todo
                </span>
              </label>
              
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2 animate-in slide-in-from-left-5">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                    {selectedItems.length} seleccionados
                  </span>
                  <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Archivar">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Eliminar">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors" title="Etiquetar">
                    <Tag className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filtros</span>
              </button>
              
              <div className="flex items-center bg-gray-200 dark:bg-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('comfortable')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === 'comfortable'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Cómodo
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    viewMode === 'compact'
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Compacto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Items List */}
      <div className="px-6 py-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className={`group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 ${
                index !== filteredData.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
              } ${selectedItems.includes(item.id) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}`}
            >
              <div className={`flex items-start space-x-4 p-${viewMode === 'comfortable' ? '6' : '4'}`}>
                {/* Enhanced Checkbox */}
                <div className="flex items-center pt-1">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </div>

                {/* Enhanced Star Button */}
                <button
                  onClick={() => toggleStar(item.id)}
                  className={`flex-shrink-0 p-1 rounded-full transition-colors ${
                    item.isStarred
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-gray-300 dark:text-gray-600 hover:text-yellow-500'
                  }`}
                >
                  <Star className={`w-5 h-5 ${item.isStarred ? 'fill-current' : ''}`} />
                </button>

                {/* Enhanced Product Image */}
                <div className="flex-shrink-0">
                  <div className={`bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center ${
                    viewMode === 'comfortable' ? 'w-12 h-12' : 'w-10 h-10'
                  }`}>
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.categoryColor}`}>
                        {item.category}
                      </span>
                      {item.badge && (
                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {!item.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.time}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className={`font-semibold text-gray-900 dark:text-gray-100 mb-2 ${
                    !item.isRead ? 'font-bold' : 'font-medium'
                  } ${viewMode === 'comfortable' ? 'text-base' : 'text-sm'}`}>
                    {item.title}
                  </h3>
                  
                  <p className={`text-gray-600 dark:text-gray-300 line-clamp-2 ${
                    viewMode === 'comfortable' ? 'text-sm' : 'text-xs'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="flex items-center justify-between mt-6 px-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando <span className="font-medium">1</span> a <span className="font-medium">5</span> de{' '}
            <span className="font-medium">20</span> elementos
          </p>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </button>
            
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== VERSIÓN ALTERNATIVA CON CARDS COMPLETAS =====

export const DataBodyCards = (props: IDataBody) => {
  const { data = [], terminoBusqueda = '', totalElementos = 0 } = props;

  const obtenerMensajeVacio = () => {
    if (terminoBusqueda.trim()) {
      return `No se encontraron resultados para "${terminoBusqueda}".`;
    }
    return 'No hay elementos disponibles.';
  };

  return (
    <div className="bg-gray-50">
      {data && data.length > 0 ? (
        <div className="p-4">
          {/* GRID RESPONSIVO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((product: IProduct) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Imagen del producto */}
                <div className="relative">
                  <img
                    alt="Product"
                    className="w-full h-40 sm:h-48 object-cover"
                    src={product.images?.[0] || '/placeholder-image.jpg'}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      NUEVO
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button className="p-1.5 bg-white/80 hover:bg-white text-gray-600 hover:text-yellow-500 rounded-full transition-colors">
                      <Star className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 bg-white/80 hover:bg-white text-gray-600 rounded-full transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Contenido de la card */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {product.category?.name || 'General'}
                    </span>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {product.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 px-4 text-gray-500">
          <div className="mb-2 text-base sm:text-lg">
            {obtenerMensajeVacio()}
          </div>
          {terminoBusqueda && (
            <div className="text-sm text-gray-400">
              Intenta con otros términos de búsqueda
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ===== VERSIÓN CON LISTA COMPACTA PARA MÓVIL =====

export const DataBodyCompact = (props: IDataBody) => {
  const { data = [], terminoBusqueda = '', totalElementos = 0 } = props;

  const obtenerMensajeVacio = () => {
    if (terminoBusqueda.trim()) {
      return `No se encontraron resultados para "${terminoBusqueda}".`;
    }
    return 'No hay elementos disponibles.';
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      {data && data.length > 0 ? (
        <div className="divide-y  dark:bg-gray-800 divide-gray-100">
          {data.map((product: IProduct) => (
            <div 
              key={product.id} 
              className="p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start space-x-3">
                {/* Checkbox y estrella */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <button className="text-gray-400 hover:text-yellow-500 transition-colors duration-150 hidden sm:block">
                    <Star className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Imagen */}
                <img
                  alt="Product"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                  src={product.images?.[0] || '/placeholder-image.jpg'}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                  }}
                />

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                          {product.category?.name || 'General'}
                        </span>
                        <span className="px-1.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                          NUEVO
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-base sm:text-lg font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <span className="text-xs text-gray-500 sm:hidden">
                          ID: {product.id}
                        </span>
                      </div>
                    </div>
                    
                    {/* Menú de opciones */}
                    <button className="p-1.5 ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 text-gray-500">
          <div className="mb-2 text-base sm:text-lg">
            {obtenerMensajeVacio()}
          </div>
          {terminoBusqueda && (
            <div className="text-sm text-gray-400">
              Intenta con otros términos de búsqueda
            </div>
          )}
        </div>
      )}
    </div>
  );
};