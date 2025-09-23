import {
  useDeleteCategoryByIdMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryByIdMutation,
} from "@/generated/graphql-types";
import CategoryCard from "./CategoryCard";
import { toast } from "react-toastify";

const CategoryList = () => {
  const { data, loading, error } = useGetAllCategoriesQuery();
  const [deleteCategoryById, { loading: loadingDelete, error: errorDelete }] =
    useDeleteCategoryByIdMutation();
  const [updateCategoryById, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateCategoryByIdMutation();
  const categories = data?.getAllCategories || [];
  const handleDelete = async (id: number) => {
    try {
      await deleteCategoryById({
        variables: { id },
      });
      toast.success("🗑️ Catégorie supprimés avec succès !");
      console.log(`Supprimer la catégorie avec l'ID: ${id}`);
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Échec de la suppression");
    }
  };
  const handleUpdate = async (id: number, title: string, image: string) => {
    try {
      await updateCategoryById({
        variables: { data: { id, title, image } },
      });
      toast.success("✏️ Catégorie modifiée avec succès !");
      console.log(`Modifier la catégorie avec l'ID: ${id}`);
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Échec de la modification");
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (loadingUpdate) return <p>Loading ...</p>;
  if (errorUpdate) return <p>Erreur : {errorUpdate.message}</p>;
  if (loadingDelete) return <p>Loading ...</p>;
  if (errorDelete) return <p>Erreur : {errorDelete.message}</p>;
  return (
    <div className="flex flex-col mb-12 ">
      {categories.map((category: any) => (
        <div className="flex flex-row mt-4 " key={category.id}>
          <CategoryCard
            id={category.id}
            key={category.id}
            title={category.title}
            image={category.image}
          />
          <div className="flex flex-row items-center ml-4 mr-4">
            <p className="mr-4">Modifier</p>
            <button onClick={() => {}}>
              <img
                src="/assets/images/icons/pencil.png"
                alt="editer"
                className="w-4 h-4  lg:w-6 lg:h-6  m-auto"
              />{" "}
            </button>
          </div>

          <div className="flex flex-row items-center ml-4 mr-4">
            <p className="mr-4">Supprimer</p>
            <button onClick={() => handleDelete(category.id)}>
              <img
                src="/assets/images/icons/corbeille.png"
                alt="supprimer"
                className="w-4 h-4  lg:w-6 lg:h-6  m-auto"
              />{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
