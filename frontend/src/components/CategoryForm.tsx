import { FieldError, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const {
    register, // pour lier les champs du formulaire
    handleSubmit, // fonction pour gérer la soumission
    formState: { errors }, // pour gérer les erreurs
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Titre de la catégorie</label>
        <input
          className="border border-gray-300 rounded p-2"
          type="category"
          {...register("category", { required: "Catégorie requise" })}
        />
      </div>
      {errors.category && <p>{(errors.category as FieldError).message}</p>}
      <div>
        <button
          type="button"
          onClick={() => document.getElementById(`file-upload`)?.click()}
          className="hover:bg-green border-green border-1 hover:text-white px-4 py-2 rounded bg-light-beige text-green transition mt-4 cursor-pointer"
        >
          Parcourir une image
        </button>
        <input
          id={`file-upload`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              const file = e.target.files[0];

              if (file.size > 5 * 1024 * 1024) {
                toast.error("L'image est trop grande (max. 5MB).");
                return;
              }
              if (!file.type.startsWith("image/")) {
                toast.error("Le fichier doit être une image.");
                return;
              }
            }
          }}
        />
        {errors.image && <p>{(errors.image as FieldError).message}</p>}
      </div>

      <button type="submit">Valider</button>
    </form>
  );
};
export default CategoryForm;
