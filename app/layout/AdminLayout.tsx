// layouts/AdminLayout.tsx - Layout específico para administradores

import { Outlet } from "react-router";
import { useAuth } from "~/context/Auth/authContext";
import { ProtectedRoute } from "~/Components/shared/ProtectedRoute/ProtectedRoute";
import { useState } from "react";
import { SideBar } from "~/Components/Layout/SideBar/SideBar";
import { Header } from "~/Components/Layout/Header/Header";

export default function AdminLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProtectedRoute requiredRoles={['admin']}>
    <SideBar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          user={user?.role}
          // userRole={user?.role}
        />
        
        <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out 
          bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 
          dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 
          ${sidebarOpen ? "ml-64" : "ml-16"}`}>
          
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
         user={user?.role}
          />
          
          <main className="flex-1 pt-20 overflow-y-auto">
            <Outlet />
          </main>
        </div>
    </ProtectedRoute>
  );
}
