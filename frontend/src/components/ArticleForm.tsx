import { useRef, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useGetAllCategoriesQuery } from "../generated/graphql-types";
import { toast } from "react-toastify";

export const ArticleForm = ({
  createOrUpdate,
}: {
  createOrUpdate: "create" | "update";
}) => {
  const { error, loading, data } = useGetAllCategoriesQuery();
  const tailles = ["Taille unique", "S", "M", "L", "XL"];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //   const [images, setImages] = useState<File[]>([]);

  const onSubmit = async (data: any) => {
    console.log(data);
    // if (images) {
    //   console.log("Images à envoyer :", images);
    // }
    toast.success("Article publié! 💪");
    reset();
    // setImages([]);
  };

  //   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = e.target.files;
  //     if (files) {
  //       const fileArray = Array.from(files);
  //       setImages(fileArray);
  //     }
  //   };

  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeTextarea = () => {
    const el = descriptionRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  if (error) return <p>Error, something went wrong</p>;
  if (loading) return <p>Loading ...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <p className="text-red-500">{(errors.title as FieldError).message}</p>
        )}
      </div>

      {/* Image */}
      {/* <div>
        <label htmlFor="image" className="block">
          Images
        </label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          multiple
          className="border p-2 rounded w-full"
        />
        {images.length > 0 && (
          <ul className="mt-2 text-green-500 list-disc list-inside">
            {images.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div> */}

      {/* Catégorie */}
      <div>
        <label htmlFor="category" className="block">
          Catégorie
        </label>
        <select
          id="category"
          {...register("category", {
            required: "Veuillez sélectionner une catégorie",
          })}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Sélectionnez une catégorie --</option>
          {data?.getAllCategories.map((category) => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500">
            {(errors.category as FieldError).message}
          </p>
        )}
      </div>

      {/* Taille */}
      <div>
        <label htmlFor="size" className="block">
          Taille
        </label>
        <select
          id="size"
          {...register("size", {
            required: "Veuillez sélectionner une taille",
          })}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Sélectionnez une taille --</option>
          {tailles.map((taille, index) => (
            <option key={index} value={taille}>
              {taille}
            </option>
          ))}
        </select>
        {errors.size && (
          <p className="text-red-500">{(errors.size as FieldError).message}</p>
        )}
      </div>

      {/* Quantité */}
      <div>
        <label htmlFor="quantity" className="block">
          Quantité
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          {...register("quantity", {
            required: "La quantité est requise",
            min: { value: 1, message: "La quantité doit être d'au moins 1" },
          })}
          className="border p-2 rounded w-full"
        />
        {errors.quantity && (
          <p className="text-red-500">
            {(errors.quantity as FieldError).message}
          </p>
        )}
      </div>

      {/* Prix */}
      <div>
        <label htmlFor="price" className="block">
          Prix (€)
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          min={0}
          {...register("price", {
            required: "Le prix est requis",
            min: { value: 0, message: "Le prix ne peut pas être négatif" },
          })}
          className="border p-2 rounded w-full"
        />
        {errors.price && (
          <p className="text-red-500">{(errors.price as FieldError).message}</p>
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
          className="border p-2 rounded w-full overflow-hidden resize-none"
          maxLength={450}
          onInput={handleResizeTextarea}
          ref={(e) => {
            register("description").ref(e);
            descriptionRef.current = e;
          }}
        />
        {errors.description && (
          <p className="text-red-500">
            {(errors.description as FieldError).message}
          </p>
        )}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
        Envoyer
      </button>
    </form>
  );
};
