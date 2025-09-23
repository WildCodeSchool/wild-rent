import {
  ResetPasswordInput,
  useResetPasswordMutation,
} from "@/generated/graphql-types";
import { JSX } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

type FormData = {
  token: string;
  new_password: string;
  password_confirmation: string;
};

function ResetPassword(): JSX.Element {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  if (!token) {
    return <div>//TODO Votre token n'est pas bon</div>;
  }
  const onSubmit: SubmitHandler<ResetPasswordInput> = async (
    data: FormData
  ) => {
    await resetPassword({
      variables: {
        data: {
          token: token,
          new_password: data.new_password,
          password_confirmation: data.password_confirmation,
        },
      },
      onCompleted: async () => {
        toast.success("Nouveau mot de passe créé avec succès !");
        navigate("/");
      },
      onError: (error) => {
        console.error("error", error);
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Réinitialisation du mot de passe
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm text-gray-600">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              {...register("new_password", {
                required: "Ce champ est requis",
                minLength: { value: 8, message: "8 caractères minimum" },
              })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.new_password && (
              <p className="text-red-600 text-sm">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              {...register("password_confirmation", {
                required: "Ce champ est requis",
                validate: (value, { new_password }) =>
                  value === new_password ||
                  "Les mots de passe ne correspondent pas",
              })}
              className="w-full border rounded px-3 py-2"
            />
            {errors.password_confirmation && (
              <p className="text-red-600 text-sm">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white py-2 rounded-2xl hover:bg-blue transition duration-300 cursor-pointer"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
