        // Formatear fecha
  export const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    const hoy = new Date();
    const diferencia = hoy.getTime() - date.getTime();
    const dias = Math.floor(diferencia / (1000 * 3600 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    return date.toLocaleDateString();
  };