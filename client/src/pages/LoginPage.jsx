import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data)
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center text-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {
        signinErrors.map((error, i) => (
          <div className="bg-red-500 p2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))
      }
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

      <form onSubmit={onSubmit}>
        <input
          autoComplete="on"
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">Email requerido</p>}

        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Contraseña"
        />
        {errors.password && (
          <p className="text-red-500">Contraseña requerida</p>
        )}
        <button type="submit" className="my-2 py-2 px-4 bg-sky-700 text-lg rounded-md">Iniciar sesión</button>
      </form>

        <p className="flexx gap-x-2 justify-between">
          Aún no tienes una cuenta? <Link to="/register" className="text-sky-500">Registrarse</Link>
          </p>

      </div>
    </div>
  );
}
