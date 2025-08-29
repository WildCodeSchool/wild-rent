import { toUTCISOString } from "@/components/CategoryCarousel";
import ItemCard from "@/components/ItemCard";
import Loader from "@/components/Loader";
import { ProductFilters } from "@/components/ProductFilters";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useGetAllTagsQuery,
  useGetAvailableProductForDatesQuery,
} from "@/generated/graphql-types";
import { useRentalDates } from "@/hooks/useRentalDates";

import { useSearchParams } from "react-router-dom";

const SearchArticle = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { startDate, endDate } = useRentalDates();

  const { data, loading, error, refetch } = useGetAvailableProductForDatesQuery(
    {
      variables: {
        keyword: keyword,
        startDate: startDate ? toUTCISOString(startDate) : "",
        endDate: endDate ? toUTCISOString(endDate) : "",
        tags: [],
      },
      skip: !startDate || !endDate,
    }
  );

  const { data: tagsData } = useGetAllTagsQuery();

  const products = data?.getAvailableProductForDates;

  const tags = tagsData?.getAllTags;

  const uniqueTags = tags?.filter(
    (tag, index, self) => index === self.findIndex((t) => t.label === tag.label)
  );

  if (loading) return <Loader />;
  if (error) console.error(error);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col sm:flex-row w-full px-5 lg:px-10 xl:px-20 mt-10 gap-10">
        <div className="w-full sm:w-1/4">
          <div className="sm:hidden flex flex-col">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-2xl lg:text-3xl text-title font-bold text-black mb-5">
                  Filtres
                </AccordionTrigger>
                <AccordionContent>
                  {uniqueTags && (
                    <ProductFilters tags={uniqueTags} refetch={refetch} />
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="hidden sm:flex flex-col">
            <h2 className="text-2xl lg:text-3xl text-title font-bold text-black mb-5">
              Filtres
            </h2>
            {uniqueTags && (
              <ProductFilters tags={uniqueTags} refetch={refetch} />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 sm:w-3/4 w-full">
          {products &&
            products.map((product) => (
              <div className="aspect-square">
                <ItemCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchArticle;
