import { useRef, useState } from "react";
import { FieldError, useForm, useFieldArray } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery,
} from "../generated/graphql-types";
import { toast } from "react-toastify";

type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  product_options: { size: string; total_quantity: number }[];
};

export const ArticleForm = ({
  createOrUpdate,
}: {
  createOrUpdate: "create" | "update";
}) => {
  const { error, loading, data } = useGetAllCategoriesQuery();
  const [createProductMutation] = useCreateProductMutation();
  const [size, setSize] = useState(["Taille unique", "S", "M", "L", "XL"]);
  const [selectedSize, setSelectedSize] = useState([""]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      product_options: [{ size: "", total_quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_options",
  });

  //   const [images, setImages] = useState<File[]>([]);

  const onSubmit = async (formData: ProductFormValues) => {
    const formattedOptions = formData.product_options.map(
      (opt: { size: string; total_quantity: any }) => ({
        size: opt.size,
        total_quantity: parseInt(opt.total_quantity),
        available_quantity: parseInt(opt.total_quantity),
      })
    );

    const input = {
      name: formData.title,
      description: formData.description,
      price: parseFloat(formData.price.toString()),
      pictures: [{ id: 1 }],
      category: {
        id: parseInt(formData.category),
      },
      product_options: formattedOptions,
    };
    console.log(input);

    if (createOrUpdate === "create") {
      try {
        const result = await createProductMutation({
          variables: { data: input },
        });
        console.log(result);
        toast.success("Article publié! 💪");
        reset();
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la publication");
      }
    }
    // if (images) {
    //   console.log("Images à envoyer :", images);
    // }
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
        <label htmlFor="title" className="block font-semibold mb-1">
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
        <label htmlFor="image" className="block font-semibold">
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
        <label htmlFor="category" className="block font-semibold mb-1 mt-3">
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
            <option key={category.id} value={category.id}>
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

      {/* Product Options */}
      <div className="space-y-4 mt-4">
        <label className="block font-semibold mb-1">Taille & Quantités</label>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center"
          >
            {/* Taille */}
            <div className="flex-1 w-full">
              <label className="block">Taille</label>
              <select
                {...register(`product_options.${index}.size`, {
                  required: "Veuillez sélectionner une taille",
                })}
                className="border rounded p-2 w-full"
                onChange={(e) => {}}
              >
                <option value="">-- Sélectionnez une taille --</option>
                {size.map((taille, i) => (
                  <option key={i} value={taille}>
                    {taille}
                  </option>
                ))}
              </select>
              {errors.product_options?.[index]?.size && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.product_options?.[index]?.size?.message}
                </p>
              )}
            </div>

            {/* Quantité */}
            <div className="flex-1 w-full">
              <label className="block">Quantité</label>
              <input
                type="number"
                min={1}
                {...register(`product_options.${index}.total_quantity`, {
                  required: "Quantité requise",
                  min: { value: 1, message: "Minimum 1" },
                })}
                className="border rounded p-2 w-full"
              />
              {errors.product_options?.[index]?.total_quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.product_options[index].total_quantity?.message}
                </p>
              )}
            </div>

            {/* Supprimer */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 font-bold text-xl cursor-pointer border-2 h-6 w-6 rounded-full transition mt-6 flex items-center justify-center pb-1.5 hover:animate-bounce"
                title="Supprimer"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Bouton Ajouter */}
        <button
          type="button"
          onClick={() => {
            append({ size: "", total_quantity: 1 });
          }}
          className="bg-green border-green border-1 text-white px-4 py-2 rounded hover:bg-light-beige hover:text-green transition mb-3 cursor-pointer"
        >
          Ajouter une taille
        </button>
      </div>

      {/* Prix */}
      <div>
        <label htmlFor="price" className="block font-semibold mb-1 mt-3">
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
        <label htmlFor="description" className="block font-semibold mb-1 mt-3">
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

      <button
        type="submit"
        className="bg-green border-green border-1 text-white px-4 py-2 rounded hover:bg-light-beige hover:text-green transition mt-4 cursor-pointer"
      >
        Envoyer
      </button>
    </form>
  );
};
