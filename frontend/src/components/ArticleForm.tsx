import { useEffect, useRef, useState } from "react";
import { FieldError, useForm, useFieldArray } from "react-hook-form";
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery,
} from "../generated/graphql-types";
import { toast } from "react-toastify";
import axios from "axios";

type ProductFormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  pictures: { url: string }[];
  product_options: { size: string; total_quantity: number }[];
};

export const ArticleForm = ({
  createOrUpdate,
}: {
  createOrUpdate: "create" | "update";
}) => {
  const { error, loading, data } = useGetAllCategoriesQuery();
  const [createProductMutation] = useCreateProductMutation();
  const [selectedSize, setSelectedSize] = useState<
    { index: number; value: string }[]
  >([{ index: 0, value: "" }]);
  const [isEnable, setIsEnable] = useState(true);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ProductFormValues>({
    defaultValues: {
      product_options: [{ size: "", total_quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "product_options",
  });

  const {
    fields: pictureFields,
    append: appendPicture,
    remove: removePicture,
  } = useFieldArray({
    control,
    name: "pictures",
  });

  const getAvailableSizes = (index: number): string[] => {
    const baseSizes = ["S", "M", "L", "XL"];
    const includeUnique = fields.length === 1;
    const sizes = includeUnique ? [...baseSizes, "Taille unique"] : baseSizes;

    return sizes.filter((sizeOption) => {
      for (const sel of selectedSize) {
        if (sel.value === sizeOption && sel.index !== index) {
          return false;
        }
      }
      return true;
    });
  };

  useEffect(() => {
    const foundUnique = selectedSize.find((s) => s.value === "Taille unique");
    setIsEnable(!foundUnique);
  }, [selectedSize]);

  useEffect(() => {
    if (pictureFields.length === 0) {
      appendPicture({ url: "" });
    }
  }, []);

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
      pictures: formData.pictures,
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
        setPreviewImages([]);
      } catch (error) {
        console.log(error);
        toast.error("Erreur lors de la publication");
      }
    }
  };

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

      {/* Images */}
      <div className="mt-4">
        <label className="block font-semibold mb-1">Images</label>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {pictureFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col items-center gap-2 border p-3 rounded"
            >
              {getValues(`pictures.${index}.url`) ? (
                <img
                  src={
                    previewImages[index]
                      ? previewImages[index]
                      : getValues(`pictures.${index}.url`)
                  }
                  alt={`Preview ${index}`}
                  className="w-45 h-45 object-cover rounded shadow"
                />
              ) : (
                <div className="flex flex-col items-start gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById(`file-upload-${index}`)?.click()
                    }
                    className="hover:bg-green border-green border-1 hover:text-white px-4 py-2 rounded bg-light-beige text-green transition mt-4 cursor-pointer"
                  >
                    Parcourir une image
                  </button>

                  <input
                    id={`file-upload-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
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

                        // 1. Créer une preview locale
                        const previewUrl = URL.createObjectURL(file);

                        // 2. Stocker localement dans previewImages
                        setPreviewImages((prev) => {
                          const updated = [...prev];
                          updated[index] = previewUrl;
                          return updated;
                        });

                        // 3. Mettre la valeur RHF en parallèle (pour GraphQL)
                        setValue(`pictures.${index}.url`, previewUrl);

                        // 4. Upload réel du fichier
                        const formData = new FormData();
                        formData.append("file", file);

                        try {
                          const res = await axios.post("/img", formData);
                          setValue(`pictures.${index}.url`, res.data.filename);
                        } catch (err) {
                          console.error("Erreur upload image:", err);
                          toast.error("Erreur lors de l'upload de l'image.");
                        }
                      }
                    }}
                  />
                </div>
              )}

              <input
                type="hidden"
                {...register(`pictures.${index}.url` as const)}
              />

              <button
                type="button"
                onClick={() => removePicture(index)}
                className="text-red-500 mt-1 border-1 rounded px-2 py-1 cursor-pointer"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        {/* Bouton d'ajout */}
        <button
          type="button"
          onClick={() => appendPicture({ url: "" })}
          className="bg-green border-green border-1 text-white px-4 py-2 rounded hover:bg-light-beige hover:text-green transition mt-4 cursor-pointer"
        >
          Ajouter une image
        </button>
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
                onChange={(e) => {
                  const newValue = e.target.value;
                  const oldSize = selectedSize.find(
                    (size) => size.index === index
                  );

                  if (oldSize) {
                    const newSelectedSize = selectedSize.map((el) =>
                      el.index === index ? { ...el, value: newValue } : el
                    );
                    setSelectedSize(newSelectedSize);
                  } else {
                    setSelectedSize([
                      ...selectedSize,
                      { index, value: newValue },
                    ]);
                  }
                }}
              >
                <option value="">-- Sélectionnez une taille --</option>
                {getAvailableSizes(index).map((taille, i) => (
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
                onClick={() => {
                  remove(index);
                  setSelectedSize((prev) =>
                    prev.filter((el) => el.index !== index)
                  );
                }}
                className="text-red-500 font-bold text-xl cursor-pointer border-2 h-6 w-6 rounded-full transition mt-6 flex items-center justify-center pb-1.5 hover:animate-bounce"
                title="Supprimer"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {/* Ajouter une taille */}
        <button
          type="button"
          onClick={() => {
            if (isEnable) {
              append({ size: "", total_quantity: 1 });
            }
          }}
          className={
            isEnable
              ? "bg-green border-green border-1 text-white px-4 py-2 rounded hover:bg-light-beige hover:text-green transition mb-3 cursor-pointer"
              : "bg-gray-300 border-gray-300 text-red-600 cursor-not-allowed px-4 py-2 rounded transition mb-3 border-1"
          }
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
