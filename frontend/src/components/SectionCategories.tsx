import { useGetAllCategoriesQuery } from "../generated/graphql-types";
import CategoryCard from "./CategoryCard";
import CategoryCarousel from "./CategoryCarousel";

function SectionCategories() {
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categories = categoriesData?.getAllCategories;

  if (categories)
    return (
      <>
        <div className="flex flex-col w-full items-center gap-6 lg:hidden">
          {categories.map((category) => (
            <CategoryCard
              id={category.id}
              title={category.title}
              image={category.image}
            />
          ))}
        </div>
        <div className="lg:flex flex-col w-full items-center gap-6 hidden">
          {categories.map((category) => (
            <CategoryCarousel id={category.id} title={category.title} />
          ))}
        </div>
      </>
    );
}

export default SectionCategories;
