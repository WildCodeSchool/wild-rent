import { useGetAllCategoriesQuery } from "@/generated/graphql-types";

const CategoryList = () => {
  const { data, loading, error } = useGetAllCategoriesQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categories = data?.getAllCategories || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category: any) => (
        <div key={category.id}>
          <p>{category.title}</p>
          <img
            src={
              category.image?.startsWith("/img/")
                ? category.image
                : `/assets/images/categories/${category.image}`
            }
            alt={category.title}
            className="w-64 h-64 object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
