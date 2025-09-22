import { useCreateNewCategoryMutation } from "@/generated/graphql-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

type CategoryFormData = {
  title: string;
  image: string;
};

const CategoryForm = () => {
  const [createNewCategory, { loading }] = useCreateNewCategoryMutation();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>();

  const onSubmit = async (formData: CategoryFormData) => {
    try {
      await createNewCategory({
        variables: {
          data: formData,
        },
      });
      toast.success("Catégorie créée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
      toast.error("Impossible de créer la catégorie.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Champ Titre */}
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
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Upload Image */}
      <div>
        <label className="block font-semibold mb-1">Image</label>
        <input
          id="file"
          type="file"
          accept="image/*"
          className="border p-2 rounded w-1/2 bg-white"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              const file = e.target.files[0];

              const previewUrl = URL.createObjectURL(file);
              setValue("image", previewUrl);

              const formData = new FormData();
              formData.append("file", file);
              try {
                const res = await axios.post("/img", formData);
                console.log(res.data);
                setValue("image", res.data.filename);
                setPreview(URL.createObjectURL(file));
              } catch (error) {
                console.error(error);
                toast.error("Erreur lors de l'upload de l'image.");
              }
            }
          }}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}

        {/* Preview de l’image */}
        {(preview || watch("image")) && (
          <img
            src={preview || `/uploads/${watch("image")}`}
            alt="Aperçu"
            className="mt-2 w-32 h-32 object-cover border rounded"
          />
        )}
      </div>

      {/* Bouton Submit */}
      <button
        className="text-white bg-red-500 mt-5 rounded px-4 py-2 cursor-pointer disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? "Envoi en cours..." : "Envoyer"}
      </button>
    </form>
  );
};

export default CategoryForm;
