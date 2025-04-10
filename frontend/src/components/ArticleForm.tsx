import { useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useGetAllCategoriesQuery } from "../generated/graphql-types";

export const ArticleFrom = ({
  createOrUpdate,
}: {
  createOrUpdate: "create" | "update";
}) => {
  const { error, loading, data } = useGetAllCategoriesQuery();
  const tailles = ["Taille unique", "S", "M", "L", "XL"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setImage(file);
  };

  if (error) return <p>Error, something went wrong</p>;
  if (loading) return <p>Loading ...</p>;
  if (data) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-md">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block">
            Titre
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Le titre est requis" })}
            className="border p-2 rounded w-full"
          />
          {errors.title && (
            <p className="text-red-500">
              {(errors.title as FieldError).message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block">
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />
          {image && (
            <p className="mt-2 text-green-500">
              Image sélectionnée: {image.name}
            </p>
          )}
        </div>

        {/* Categories */}
        <div>
          <label htmlFor="category" className="block">
            Catégorie
          </label>
          <select
            id="category"
            {...register("category", {
              required: "La catégorie est requise",
            })}
            className="border p-2 rounded w-full"
          >
            {data.getAllCategories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500">
              {(errors.title as FieldError).message}
            </p>
          )}
        </div>

        {/* Size */}
        <div>
          <label htmlFor="size" className="block">
            Taille
          </label>
          <select
            id="size"
            {...register("size", { required: "La taille est requise" })}
            className="border p-2 rounded w-full"
          >
            {tailles.map((taille, index) => (
              <option key={index} value={taille}>
                {taille}
              </option>
            ))}
          </select>
          {errors.size && (
            <p className="text-red-500">
              {(errors.title as FieldError).message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block">
            Description (max 450 caractères)
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "La description est requise",
              maxLength: {
                value: 450,
                message: "La description ne doit pas dépasser 450 caractères",
              },
            })}
            className="border p-2 rounded w-full"
            maxLength={450}
          />
          {errors.description && (
            <p className="text-red-500">
              {(errors.title as FieldError).message}
            </p>
          )}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Envoyer
        </button>
      </form>
    );
  }
};
