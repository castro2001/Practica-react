import React, { useState, useEffect } from 'react';
import { Search, Settings, RefreshCw,Star ,ChevronRight,ChevronLeft} from 'lucide-react';

import type { MainContent, Products } from "~/";

export const MainComponent = (props: MainContent)=>{
  const { title, messageError, isComponer,data=[] } = props;
  //Paginacion
  const [paginaActual, setPaginaActual] = useState(1);
  const [empleadosFiltradasPaginadas, SetEmpleadosFiltradasPaginadas] = useState<Products[]>([]);
  const empleadosPorPagina = 5;
  const [datosFiltrados, setDatosFiltrados] = useState<Products[]>(data);

  const [buscador, setBuscador] = useState('');
  const [todosSeleccionados, setTodosSeleccionados] = useState(false);
  const [elementosSeleccionados, setElementosSeleccionados] = useState<Set<number>>(new Set());
  
  // Buscador
  // Inicializar datos filtrados cuando cambien los datos
  useEffect(() => {
    setDatosFiltrados(data);
  }, [data]);

  // Efecto para manejar la búsqueda
  const filterData = (search: string) => {
    if (!search.trim()) {
      setDatosFiltrados(data);
      setPaginaActual(1);
      return;
    }
    
    // Si hay algún filtro activo
    const resultado = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(search.toLowerCase()))
    );
    setDatosFiltrados(resultado);
    setPaginaActual(1); // Reiniciar a la primera página
  }

  // Manejar búsqueda
  const manejarBusqueda = () => {
    filterData(buscador);
  };

  // Manejar búsqueda en tiempo real
  const manejarCambioBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBuscador(valor);
    filterData(valor);
  };

  // fin // Buscador
  
  //Seleccion

  // Manejar selección individual
  const manejarSeleccionIndividual = (id: number) => {
    const nuevaSeleccion = new Set(elementosSeleccionados);
    if (nuevaSeleccion.has(id)) {
      nuevaSeleccion.delete(id);
    } else {
      nuevaSeleccion.add(id);
    }
    setElementosSeleccionados(nuevaSeleccion);
    setTodosSeleccionados(nuevaSeleccion.size === empleadosFiltradasPaginadas.length);
  };

  // Manejar seleccionar todos
  const manejarSeleccionarTodos = () => {
    if (todosSeleccionados) {
      setElementosSeleccionados(new Set());
      setTodosSeleccionados(false);
    } else {
      const nuevaSeleccion = new Set(empleadosFiltradasPaginadas.map(item => item.id));
      setElementosSeleccionados(nuevaSeleccion);
      setTodosSeleccionados(true);
    }
  };
 //Seleccion fin
 
  // Efecto para manejar la paginación
  useEffect(() => {
    if (!datosFiltrados || datosFiltrados.length === 0) {
      SetEmpleadosFiltradasPaginadas([]);
      return;
    }

    const indiceUltimo = paginaActual * empleadosPorPagina;
    const indicePrimero = indiceUltimo - empleadosPorPagina;
    const paginados = datosFiltrados.slice(indicePrimero, indiceUltimo);

    SetEmpleadosFiltradasPaginadas(paginados);
  }, [datosFiltrados, paginaActual, empleadosPorPagina]);

  // Cálculo Total de Páginas
  const totalPaginas = Math.ceil(datosFiltrados.length / empleadosPorPagina);

  // Funciones para gestionar cambios de página
  const cambiarPagina = (numeroPagina: number) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  const irAPaginaAnterior = () => {
    cambiarPagina(paginaActual - 1);
  };

  const irAPaginaSiguiente = () => {
    cambiarPagina(paginaActual + 1);
  };

  // Generar números de páginas para mostrar
  const generarNumerosPaginas = () => {
    const numeros = [];
    const maxPaginasVisibles = 5;
    let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

    if (fin - inicio + 1 < maxPaginasVisibles) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      numeros.push(i);
    }
    return numeros;
  };

  // Formatear fecha
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    const hoy = new Date();
    const diferencia = hoy.getTime() - date.getTime();
    const dias = Math.floor(diferencia / (1000 * 3600 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    return date.toLocaleDateString();
  };

  return(    
    <section className=" container mx-auto max-w-4xl bg-white  rounded-lg shadow-lg overflow-hidden">

    <div className="message-header  flex items-center justify-between p-4">
       <h3 className="text-xl font-bold text-gray-800 ">{title}</h3>
      <div className="flex items-center space-x-3">
        <button onClick={()=> window.location.reload()}
        className="text-gray-500 dark:text-gray-400 
        :text-gray-700 dark:hover:text-gray-200 
        transition-colors duration-200 ease-in-out"
        aria-label="Actualizar">
        <RefreshCw className="h-6 w-6" />
        </button>

        {isComponer && (
        <button
        onClick={() => alert("Abrir modal")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 ease-in-out flex items-center"
        >
        <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Componer
        </button>
        )}

      </div>
    </div>

    {/* Barra de búsqueda */}
    <div className="search-bar px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex gap-1" >
        <input 
          type="text" 
          placeholder="Buscar mensajes..."
          value={buscador}
          onChange={manejarCambioBusqueda}
         onKeyPress={(e) => e.key === 'Enter' && manejarBusqueda()}
         className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900
          dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"/>
        <button onClick={manejarBusqueda}
         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 ease-in-out">Buscar</button>
    </div>

  {/* Acciones de mensajes */}
  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={todosSeleccionados}
            onChange={manejarSeleccionarTodos}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">Seleccionar todo</span>
        </label>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ease-in-out">
          Archivar
        </button>
        <button className="px-3 py-1 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200 ease-in-out">
          Borrador
        </button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ease-in-out">
          Leído
        </button>
        <button className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 ease-in-out">
          No Leído
        </button>
      </div>
    </div>
    {/* Contenido principal */}

       <div className="bg-white" style={{ minHeight: '400px', maxHeight: '600px' }}>
      {messageError && (
        <div className="text-center p-8 text-red-500 border-t border-gray-200">
          {messageError}
        </div>
      )}

      {!messageError && (
        <>
          {/* Lista de mensajes */}
          <div className="divide-y divide-gray-200">
            {empleadosFiltradasPaginadas && empleadosFiltradasPaginadas.length > 0 ? (
              empleadosFiltradasPaginadas.map((product) => (
                <div key={product.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={elementosSeleccionados.has(product.id)}
                      onChange={() => manejarSeleccionIndividual(product.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <button className="text-gray-400 hover:text-yellow-500 transition-colors duration-150 ease-in-out">
                      <Star className="h-4 w-4" />
                    </button>
                    <img
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      src={product.image}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {product.category || 'General'}
                        </span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          NUEVO
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium truncate mb-1">
                        {product.title}
                      </p>
                      <p className="text-gray-600 text-sm truncate">
                        {product.description}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0 ml-4">
                      {/* {formatearFecha(product.)} */}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                {buscador ? 'No se encontraron resultados para tu búsqueda.' : 'No hay mensajes disponibles.'}
              </div>
            )}
          </div>

          {/* Paginación */}
          {datosFiltrados && datosFiltrados.length > empleadosPorPagina && (
            <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                {/* Información de elementos */}
                <div className="text-sm text-gray-700">
                  Mostrando {(paginaActual - 1) * empleadosPorPagina + 1} a{' '}
                  {Math.min(paginaActual * empleadosPorPagina, datosFiltrados.length)} de {datosFiltrados.length} elementos
                </div>

                {/* Controles de paginación */}
                <div className="flex items-center space-x-2">
                  {/* Botón anterior */}
                  <button
                    onClick={irAPaginaAnterior}
                    disabled={paginaActual === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      paginaActual === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </button>

                  {/* Números de página */}
                  <div className="flex space-x-1">
                    {generarNumerosPaginas().map((numeroPagina) => (
                      <button
                        key={numeroPagina}
                        onClick={() => cambiarPagina(numeroPagina)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          numeroPagina === paginaActual
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {numeroPagina}
                      </button>
                    ))}
                  </div>

                  {/* Botón siguiente */}
                  <button
                    onClick={irAPaginaSiguiente}
                    disabled={paginaActual === totalPaginas}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      paginaActual === totalPaginas
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </section>

)

}