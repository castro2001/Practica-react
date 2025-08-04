import { type RouteConfig, index,route,layout } from "@react-router/dev/routes";

export default [
 // Rutas de autenticación (sin sidebar/header)
  layout("layout/AuthLayout.tsx", [
    route("login", "routes/auth/Login.tsx"),
    route("register", "routes/auth/Register.tsx"),
  ]),

  // Rutas principales (con sidebar/header)
  layout("layout/DashboardLayout.tsx", [
    route("Dashboard", "routes/Customer/Customer.tsx"),
    route("Productos", "routes/Customer/Productos.tsx"),
    route("Productos/Detalle/:id","routes/Customer/Detalle.tsx"),
    //  route("Productos", "routes/Customer/Productos.tsx"),
//http://localhost:5173/dashboard/Detalle/Productos/1
    // Rutas de manager
    // layout("layouts/ManagerLayout.tsx", [
    //   route("dashboard/manager/analytics", "routes/manager/Analytics.tsx"),
    // ]),
  ]),

     // Rutas de administrador
    layout("layout/AdminLayout.tsx", [
      route("dashboard/admin/users", "routes/Admin/Administrador.tsx"),
      route("dashboard/Usuarios","routes/Admin/usuarios.tsx"),
      route("dashboard/:tipo/Detalle/:id","routes/Admin/Detalle.tsx"),
      // http://localhost:5173/dashboard/Detalle/Productos/1
      route("dashboard/Productos","routes/Admin/productos.tsx"),
      // route("dashboard/admin/reports", "routes/admin/Reports.tsx"),
    ]),

    index("routes/home.tsx"),
    // route("Usuarios","routes/usuarios.tsx"),
    // route("Detalle/:tipo/:id","routes/Detalle.tsx",),
    // route("Productos","routes/productos.tsx"),
    // route("Login","routes/Login.tsx"),

] satisfies RouteConfig;

/*
 

  // Ruta raíz redirige al dashboard
  index("routes/Home.tsx"),


*/