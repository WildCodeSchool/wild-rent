import { useLogoutMutation } from "@/generated/graphql-types";
import { GET_USER_INFO } from "@/graphql/queries";
import { useNavigate } from "react-router-dom";

export const AccountDetails = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
  });

  return (
    <>
      <div className="flex max-w-5xl mx-auto p-4">
        <section className="w-1/3 max-w-xs border rounded-md p-4 space-y-4 text-sm font-semibold text-gray-700">
          <div
            className="text-green-900 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Accueil
          </div>
          <div
            className="text-green-900 cursor-pointer"
            onClick={() => {
              navigate("/moncompte");
            }}
          >
            Mes informations personnelles
          </div>
          <div
            className="text-green-900 cursor-pointer"
            onClick={() => {
              navigate("/mes-commandes");
            }}
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
          <section>
            <div className="flex items-center justify-between font-semibold text-green-900">
              <h2>Mes coordonnées</h2>
              <button className="text-gray-600 text-base">✎</button>
            </div>
            <div className="mt-2 space-y-2">
              <div>
                <div className="text-gray-500">Prénom</div>
                <div>Jean Patrick</div>
              </div>
              <div>
                <div className="text-gray-500">Nom</div>
                <div>Michelot</div>
              </div>
              <div>
                <div className="text-gray-500">Email</div>
                <div>Michelot</div>
              </div>
              <div>
                <div className="text-gray-500">Numéro de téléphone</div>
                <div>08 36 65 65 65</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between font-semibold text-green-900">
              <h2>Modifier mon mot de passe</h2>
              <button className="text-gray-600 text-base">✎</button>
            </div>
          </section>

          <section>
            <div className="font-semibold text-green-900">
              Mon adresse de facturation
            </div>
            <div className="mt-2 space-y-1">
              <div>5 rue du petoncle habité</div>
              <div>51420 L'endroit</div>
              <div>France</div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};
