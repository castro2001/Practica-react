// layouts/DashboardLayout.tsx - Layout principal para usuarios autenticados
import { Outlet, Navigate } from "react-router";
import { useState } from "react";
import { useAuth } from "~/context/Auth/authContext";
import { Header } from "~/Components/Layout/Header/Header";
import { SideBar } from "~/Components/Layout/SideBar/SideBar";

export default function DashboardLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
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
    </>
  );
}
