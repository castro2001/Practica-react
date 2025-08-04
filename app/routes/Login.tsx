import type { Route } from "../+types/root";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}





export default function Login(){


    return(
        <>
        <h1 className="text-gray-900">Login</h1>
        </>
    )

} 