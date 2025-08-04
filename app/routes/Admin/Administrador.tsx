import { useAuth } from '~/context/Auth/authContext'; 
import { Welcome } from '~/Components/shared/Welcome/Welcome'; 
import { getCookie } from '~/utils/cookies';

export default function Administrador() {
  const { user, getToken ,isAuthenticated} = useAuth();
  console.log(getToken());

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
  )
}