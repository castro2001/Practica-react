import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("Usuarios","routes/usuarios.tsx"),
    route("Productos","routes/productos.tsx"),


] satisfies RouteConfig;
