import { ChangePasswordForm } from "@/components/ChangePasswordForm";
import {
  useGetUserInfoQuery,
  useLogoutMutation,
} from "../generated/graphql-types";
import { WHO_AM_I } from "@/graphql/queries";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AccountDetails = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useGetUserInfoQuery({
    fetchPolicy: "no-cache",
  });
  const user = data?.getUserInfo;
  const date = new Date(user?.created_at);
  const formattedCreatedAt = date.toLocaleDateString("fr");

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
                <div className="flex items-center justify-between font-semibold text-green-900">
                  <h2>Mes coordonnées</h2>
                  <button className="text-gray-600 text-base">✎</button>
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
                <div className="flex items-center justify-between font-semibold text-green-900">
                  <h2>Modifier mon mot de passe</h2>
                  <button onClick={() => setShowPasswordForm(true)}>✎</button>
                </div>
              </section>

              <section>
                <div className="font-semibold text-green-900">
                  Mon adresse de facturation
                </div>
                <div className="mt-2 space-y-1">
                  <div>{user?.address.street}</div>
                  <div>
                    {user?.address.zipcode} {user?.address.city}
                  </div>
                  <div>{user?.address.country}</div>
                </div>
              </section>
            </>
          )}
        </section>
      </div>
    );
  }
};
