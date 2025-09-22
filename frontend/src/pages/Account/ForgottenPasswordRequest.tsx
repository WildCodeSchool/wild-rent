import { JSX } from "react";

type Props = {
  setForgottenPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

function ForgottenPasswordRequest({
  setForgottenPassword,
}: Props): JSX.Element {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Mot de passe oublié
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-600 mb-1 font-medium"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Entrez votre adresse email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green text-white py-2 rounded-2xl hover:bg-blue transition duration-300 cursor-pointer"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>

        <button
          onClick={() => setForgottenPassword(false)}
          className="w-full mt-4 text-gray-600 underline cursor-pointer"
        >
          ← Retour à la connexion
        </button>
      </div>
    </div>
  );
}

export default ForgottenPasswordRequest;
