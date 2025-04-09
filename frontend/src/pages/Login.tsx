import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../generated/graphql-types";
import { GET_USER_INFO } from "../graphql/queries";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [login] = useLoginMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
  });

  const navigate = useNavigate();

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    login({
      variables: { data: { email: data.email, password: data.password } },
      onCompleted: () => navigate("/"),
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md h-full md:h-auto w-full md:w-auto flex justify-center items-center flex-col">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Se connecter
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Email"
              defaultValue="romanbeldent@gmail.com"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email requis</span>
            )}
          </div>

          <div>
            <label className="block text-gray-600">Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              defaultValue="test"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Mot de passe requis</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white py-2 rounded-2xl hover:bg-blue transition duration-300 cursor-pointer
"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-green underline font-semibold">
            Inscrivez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
};
