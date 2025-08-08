import { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router';
import { Section } from '~/Components/Layout/Section/Section';
import { InputComponente } from '~/Components/ui/Form/Input/input';
import { useAuth } from '~/context/Auth/authContext'; 
import { styleContenedor, styleInput, styleLabel } from '~/data/themes/formulario';
import type { Props } from '~/types/forms';

export default function Login() {
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });



  const from = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const fields: Props<typeof formData>["fields"] = [
  {
    name: "email",
   classNameLabel:styleLabel,
    classNameContenedor:styleContenedor,
    classNameInput:styleInput,
    label: "Correo Electrónico",
    type: "email",
    placeholder: "correo@ejemplo.com",
  },
  {
    classNameLabel:styleLabel,
    classNameContenedor:styleContenedor,
    classNameInput:styleInput,
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Contraseña",
  },
];
  return (
    <>
<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 fixed top-3 left-0 right-0">
     <div className="max-w-md w-full space-y-8">
        {/* <div> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
        {/* </div> */}

        <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <InputComponente 
          fields={fields}
          values={formData}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
        <div className="text-center">
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </form>
        </div>
</div>
 </>
  );
}
