import { JSX } from "react";

function PasswordForm(): JSX.Element {
  return (
    <form className="space-y-4 mt-4 max-w-md">
      <div>
        <label className="block text-sm text-gray-600">
          Ancien mot de passe
        </label>
        <input type="password" className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm text-gray-600">
          Nouveau mot de passe
        </label>
        <input type="password" className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm text-gray-600">
          Confirmer le nouveau mot de passe
        </label>
        <input type="password" className="w-full border rounded px-3 py-2" />
      </div>
      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 cursor-pointer"
      >
        Valider
      </button>
    </form>
  );
}

export default PasswordForm;
