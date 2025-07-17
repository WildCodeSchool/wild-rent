import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import {
  CreateNewAddressInput,
  useCreateNewAddressMutation,
  useGetUserInfoQuery,
  useLogoutMutation,
  useWhoamiQuery,
} from "../generated/graphql-types";
import { WHO_AM_I } from "@/graphql/queries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

export const AccountDetails = () => {
  const navigate = useNavigate();
  const {
    loading,
    error,
    data,
    refetch: refetchUserInfo,
  } = useGetUserInfoQuery({
    fetchPolicy: "no-cache",
  });

  const whoami = useWhoamiQuery();
  const userId = whoami.data?.whoami?.id;

  const user = data?.getUserInfo;
  const date = new Date(user?.created_at);
  const formattedCreatedAt = date.toLocaleDateString("fr");

  const [createNewAddressMutation] = useCreateNewAddressMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewAddressInput>();
  const onSubmit: SubmitHandler<CreateNewAddressInput> = async (data) => {
    await createNewAddressMutation({
      variables: {
        data: {
          userId: userId,
          street: data.street,
          city: data.city,
          zipcode: data.zipcode,
          country: data.country,
        },
      },
      onCompleted: async () => {
        toast.success("Vous avez ajouté une nouvelle adresse de facturation !");
        await refetchUserInfo();
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: WHO_AM_I, fetchPolicy: "no-cache" }],
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p> Error : {error.message}</p>;
  if (data) {
    return (
      <div className="flex w-full p-8 gap-8">
        <section className="w-64 border rounded-md p-6 space-y-6 text-sm font-semibold text-gray-700">
          <div
            className="text-green-900 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Accueil
          </div>
          <div
            className="text-green-900 cursor-pointer"
            onClick={() => {
              setShowPasswordForm(false);
              navigate("/moncompte");
            }}
          >
            Mes informations personnelles
          </div>
          <div
            className="text-green-900 cursor-pointer"
            onClick={() => navigate("/mes-commandes")}
          >
            Mes commandes
          </div>
          <div
            className="text-green-900 cursor-pointer"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Se déconnecter
          </div>
        </section>

        <section className="flex-1 pl-8 space-y-6 text-sm text-gray-800">
          {showPasswordForm ? (
            <section>
              <div className="flex items-center justify-between font-semibold text-green-900">
                <h2>Modifier mon mot de passe</h2>
                <button
                  className="text-sm text-gray-500"
                  onClick={() => setShowPasswordForm(false)}
                >
                  ← Retour
                </button>
              </div>
              <ChangePasswordForm />
            </section>
          ) : (
            <>
              <section>
                <div className="flex items-center gap-2 font-semibold text-green-900">
                  <h2>Mes coordonnées</h2>
                  <button className="text-xl text-gray-600 hover:text-green-800 cursor-pointer">
                    ✎
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  <div>
                    <div className="text-gray-500">Prénom</div>
                    <div>{user?.first_name}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Nom</div>
                    <div>{user?.last_name}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Email</div>
                    <div>{user?.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Numéro de téléphone</div>
                    <div>{user?.phone_number}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Membre depuis le </div>
                    <div>{formattedCreatedAt}</div>
                  </div>
                </div>
              </section>

              <section>
              <div className="flex items-center gap-2 font-semibold text-green-900">
                  <h2>Modifier mon mot de passe</h2>
                  <button onClick={() => setShowPasswordForm(true)} className="text-xl text-gray-600 hover:text-green-800 cursor-pointer">
                    ✎
                  </button>
                </div>
              </section>

              <section>
              <div className="flex items-center gap-2 font-semibold text-green-900">
                  <h2>Mon adresse de facturation</h2>
                  <button className="text-xl text-gray-600 hover:text-green-800 cursor-pointer">
                    ✎
                  </button>
                </div>
                {user?.address ? (
                  <div className="mt-2 space-y-1">
                    <div>{user?.address.street}</div>
                    <div>
                      {user?.address.zipcode} {user?.address.city}
                    </div>
                    <div>{user?.address.country}</div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-2 space-y-2 w-3/4 max-w-md"
                  >
                    <input
                      type="text"
                      placeholder="Rue"
                      {...register("street", { required: true })}
                      className="border rounded w-full p-2"
                      name="street"
                    />
                    {errors.street && (
                      <span className="text-red-500 text-sm">
                        Ce champ est requis
                      </span>
                    )}
                    <input
                      type="text"
                      placeholder="Ville"
                      {...register("city", { required: true })}
                      className="border rounded w-full p-2"
                      name="city"
                    />
                    {errors.city && (
                      <span className="text-red-500 text-sm">
                        Ce champ est requis
                      </span>
                    )}
                    <input
                      type="text"
                      placeholder="Code postal"
                      {...register("zipcode", { required: true })}
                      className="border rounded w-full p-2"
                      name="zipcode"
                    />
                    {errors.zipcode && (
                      <span className="text-red-500 text-sm">
                        Ce champ est requis
                      </span>
                    )}
                    <input
                      type="text"
                      placeholder="Pays"
                      {...register("country", { required: true })}
                      className="border rounded w-full p-2"
                      name="country"
                    />
                    {errors.country && (
                      <span className="text-red-500 text-sm">
                        Ce champ est requis
                      </span>
                    )}
                    <button
                      type="submit"
                      className="bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
                    >
                      Enregistrer l'adresse
                    </button>
                  </form>
                )}
              </section>
            </>
          )}
        </section>
      </div>
    );
  }
};
