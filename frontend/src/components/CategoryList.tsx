import { useGetAllCategoriesQuery } from "@/generated/graphql-types";

const CategoryList = () => {
  const { data, loading, error } = useGetAllCategoriesQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  const categories = data?.getAllCategories || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category: any) => (
        <div>
          <p>{category.title}</p>
          <img
            src={`/assets/images/categories/${category.image}`}
            alt={category.title}
            className="w-64 h-64 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};
export default CategoryList;
