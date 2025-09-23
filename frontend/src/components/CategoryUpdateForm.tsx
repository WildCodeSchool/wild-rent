import {
  useDeleteCategoryByIdMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryByIdMutation,
} from "@/generated/graphql-types";
import CategoryCard from "./CategoryCard";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type CategoryAddFormData = {
  title: string;
  image: string;
};

const CategoryUpdateForm = () => {
  const { data, loading, error } = useGetAllCategoriesQuery();
  const [deleteCategoryById] = useDeleteCategoryByIdMutation();
  const [updateCategoryById] = useUpdateCategoryByIdMutation();

  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [preview, setPreview] = useState<string | null>(null);

  // react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<CategoryAddFormData>();

  const categories = data?.getAllCategories || [];

  const handleDelete = async (id: number) => {
    try {
      await deleteCategoryById({ variables: { id } });
      toast.success("🗑️ Catégorie supprimée avec succès !");
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Échec de la suppression");
    }
  };

  const handleUpdate = async (id: number, formData: CategoryAddFormData) => {
    try {
      await updateCategoryById({
        variables: {
          data: { id, title: formData.title, image: formData.image },
        },
      });
      toast.success("✏️ Catégorie modifiée avec succès !");
      setEditingCategoryId(null);
      reset();
      setPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Échec de la modification");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col mb-12 ">
      {categories.map((category: any) => (
        <div className="flex flex-row mt-4 items-center" key={category.id}>
          {editingCategoryId === category.id ? (
            // === Mode édition avec react-hook-form ===
            <form
              onSubmit={handleSubmit((data) => handleUpdate(category.id, data))}
              className="space-y-2 border p-4 rounded-md"
            >
              {/* Champ titre */}
              <div>
                <label className="block font-semibold mb-1">Titre</label>
                <input
                  type="text"
                  defaultValue={category.title}
                  {...register("title", { required: "Titre requis" })}
                  className="border p-2 rounded w-1/2 bg-white"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              {/* Upload image */}
              <div>
                <label className="block font-semibold mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded w-1/2 bg-white"
                  onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);

                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const res = await axios.post("/img", formData);
                        setValue("image", res.data.filename);
                      } catch (error) {
                        console.error(error);
                        toast.error("Erreur lors de l'upload de l'image.");
                      }
                    }
                  }}
                />

                {/* Preview : si pas de nouvelle image → montrer l’ancienne */}
                <img
                  src={
                    preview
                      ? preview
                      : watch("image")
                      ? watch("image").startsWith("/")
                        ? watch("image")
                        : `/assets/images/categories/${watch("image")}`
                      : category.image
                  }
                  alt="Aperçu"
                  className="mt-2 w-32 h-32 object-cover border rounded"
                />
              </div>

              {/* Boutons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Valider
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCategoryId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            // === Mode affichage normal ===
            <>
              <CategoryCard
                id={category.id}
                title={category.title}
                image={category.image}
              />

              {/* Bouton modifier */}
              <div className="flex flex-row items-center ml-4 mr-4">
                <p className="mr-4">Modifier</p>
                <button
                  onClick={() => {
                    setEditingCategoryId(category.id);
                    reset({ title: category.title, image: category.image });
                  }}
                >
                  <img
                    src="/assets/images/icons/pencil.png"
                    alt="editer"
                    className="w-4 h-4 lg:w-6 lg:h-6 m-auto"
                  />
                </button>
              </div>

              {/* Bouton supprimer */}
              <div className="flex flex-row items-center ml-4 mr-4">
                <p className="mr-4">Supprimer</p>
                <button onClick={() => handleDelete(category.id)}>
                  <img
                    src="/assets/images/icons/corbeille.png"
                    alt="supprimer"
                    className="w-4 h-4 lg:w-6 lg:h-6 m-auto"
                  />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryUpdateForm;
