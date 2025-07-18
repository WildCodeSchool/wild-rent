import { useLogoutMutation } from "@/generated/graphql-types";
import { WHO_AM_I } from "@/graphql/queries";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

type MenuProps = {
  setShowPasswordForm: Dispatch<SetStateAction<boolean>>; // Todo regarder les types proposés à d'autres endroits du code
};

function Menu({ setShowPasswordForm }: MenuProps) {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation({
    refetchQueries: [{ query: WHO_AM_I, fetchPolicy: "no-cache" }],
  });

  return (
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
  );
}

export default Menu;
