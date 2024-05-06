import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const buttonClass = "bg-red-400 p-2 rounded-md";
  const linkClass = "bg-indigo-500 px-4 py-2 rounded-md font-bold";

  return (
    <nav className="bg-zinc-700 mb-3 mt-1 flex justify-between p-2 rounded-lg">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold ">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li>Bienvenido {user.username}</li>
            <li>
              <Link to="/add-task" className={linkClass}>
                Añadir tarea
              </Link>
            </li>
            <li>
              <Link
                className={buttonClass}
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Cerrar sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={linkClass}>
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="/register" className={linkClass}>
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
