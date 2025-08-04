import { useAuth } from '~/context/Auth/authContext'; 
import { Welcome } from '~/Components/shared/Welcome/Welcome'; 

export default function Customer() {
  const { user, logout, hasRole } = useAuth();

  const description: IDescription={
    content:`Usuario: ${user?.email} con el rol: ${user?.role}`
  }

  return (
    <>
    <Welcome 
      title={`Bienvenido ${user?.name} `}
      image={user?.avatar}
      descripcion={description}
    
    />
    
    </>
  );
}