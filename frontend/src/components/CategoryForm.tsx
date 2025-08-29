import { useCreateNewCategoryMutation } from "@/generated/graphql-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

type CategoryFormData = {
  title: string;
  image: string;
};

const CategoryForm = () => {
  const [createNewCategory] = useCreateNewCategoryMutation();
  const {
    register, // pour lier les champs du formulaire
    handleSubmit, // fonction pour gérer la soumission
    setValue,
    formState: { errors }, // pour gérer les erreurs
  } = useForm<CategoryFormData>();

  const onSubmit = (formData: any) => {
    console.log(formData);
    try {
      createNewCategory({
        variables: {
          data: {
            title: formData.title,
            image: formData.image,
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title" className="block font-semibold mb-1">
          Titre
        </label>
        <input
          id="title"
          className="border p-2 rounded w-1/2 bg-white"
          type="text"
          {...register("title", { required: "Catégorie requise" })}
        />
      </div>
      {errors.title && <p>{errors.title.message}</p>}
      <div>
        <label className="block font-semibold mb-1">Image</label>
        <input
          id="file"
          type="file"
          accept="image/*"
          className="border p-2 rounded w-1/2 bg-white"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              try {
                const result = await axios.post("/img", formData);
                console.log(result);
                setValue("image", result.data.filename);
              } catch (error) {
                console.error(error);
                toast.error("Erreur lors de l'upload de l'image.");
              }
            }
          }}
        />
      </div>
      {errors.image && <p>{errors.image.message}</p>}
      <button
        className="text-red-500 mt-5 border-1 rounded px-2 py-1 cursor-pointer"
        type="submit"
      >
        Envoyer
      </button>
    </form>
  );
};
export default CategoryForm;
