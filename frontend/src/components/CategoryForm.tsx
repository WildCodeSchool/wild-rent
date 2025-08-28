import { useCreateNewCategoryMutation } from "@/generated/graphql-types";
import { useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";

type CategoryFormData = {
  title: string;
  image: FileList;
};

const CategoryForm = () => {
  const [createNewCategory] = useCreateNewCategoryMutation();
  const {
    register, // pour lier les champs du formulaire
    handleSubmit, // fonction pour gérer la soumission
    watch, // pour surveiller les changements de champs
    formState: { errors }, // pour gérer les erreurs
  } = useForm<CategoryFormData>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onSubmit = (formData: any) => {
    console.log(formData);
    try {
      createNewCategory({
        variables: {
          data: {
            title: formData.title,
            image: formData.image[0],
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
    }
  };
  const image = watch("image");

  useEffect(() => {
    if (image && image[0]) {
      const file = image[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Titre de la catégorie</label>
        <input
          className="border border-gray-300 rounded p-2"
          type="title"
          {...register("title", { required: "Catégorie requise" })}
        />
      </div>
      {errors.title && <p>{(errors.title as FieldError).message}</p>}

      <div>
        <label>Choisir une image</label>
        <input
          className="hover:bg-green border-green border-1 hover:text-white px-4 py-2 rounded bg-light-beige text-green transition mt-4 cursor-pointer"
          type="file"
          accept="image/*"
          {...register("image", {
            required: "L'image est obligatoire",
            validate: {
              fileType: (files) =>
                (files[0] &&
                  ["image/jpeg", "image/png"].includes(files[0].type)) ||
                "Format autorisé : JPG/PNG",
              fileSize: (files) =>
                (files[0] && files[0].size < 2 * 1024 * 1024) || // 2MB
                "Image trop lourde (max 2 Mo)",
            },
          })}
        />
        {errors.image && <p>{(errors.image as FieldError)?.message}</p>}
      </div>
      {preview && typeof preview === "string" && (
        <div style={{ marginTop: "1rem" }}>
          <p>Aperçu :</p>
          <img src={preview} alt="Preview" style={{ width: 200 }} />
        </div>
      )}

      <button
        className="hover:bg-green border-green border-1 hover:text-white px-4 py-2 rounded bg-light-beige text-green transition mt-4 cursor-pointer"
        type="submit"
      >
        Envoyer
      </button>
    </form>
  );
};
export default CategoryForm;
