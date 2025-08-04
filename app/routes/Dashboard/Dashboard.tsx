import { useAuth } from '~/context/Auth/authContext'; 

export default function Dashboard() {
  const { user, logout, hasRole } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar}
                alt={user?.name}
              />
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Bienvenido, {user?.name}!
            </h2>
            <div className="space-y-4">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Rol:</strong> {user?.role}</p>
              
              {hasRole('admin') && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                  <p><strong>Permisos de Administrador:</strong> Puedes acceder a todas las funciones.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}