import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PriceRangeSlider } from "./PriceRangeSlider";

type tag = {
  id: number;
  label: string;
};

const FormSchema = z.object({
  tags: z.array(z.string()),
  priceRange: z.tuple([z.number(), z.number()]),
});

export function ProductFilters({
  tags,
  refetch,
  categoryId,
}: {
  tags: tag[];
  refetch: any;
  categoryId: number;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: [],
      priceRange: [0, 100],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    refetch({
      categoryId: categoryId,
      minPrice: data.priceRange[0],
      maxPrice: data.priceRange[1],
      tags: data.tags,
    });
  }

  function reset() {
    const defaultValues = {
      tags: [],
      priceRange: [0, 100] as [number, number],
    };

    form.reset(defaultValues);

    refetch({
      categoryId: categoryId,
      minPrice: defaultValues.priceRange[0],
      maxPrice: defaultValues.priceRange[1],
      tags: defaultValues.tags,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-green font-semibold text-lg lg:text-xl mb-3">
                Filtrer par type de produit:
              </FormLabel>
              {tags.map((tag) => {
                const isChecked = field.value?.includes(tag.label);
                return (
                  <FormItem
                    key={tag.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, tag.label])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== tag.label
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {tag.label}
                    </FormLabel>
                  </FormItem>
                );
              })}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceRange"
          render={() => (
            <FormItem>
              <FormLabel className="text-green font-semibold text-lg lg:text-xl mb-3">
                Filtrer par prix:
              </FormLabel>
              <Controller
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <PriceRangeSlider
                    onChange={field.onChange}
                    values={field.value}
                  />
                )}
              />
            </FormItem>
          )}
        />
        <div className="flex justify-between w-full gap-5 mt-10">
          <div className="w-1/2">
            <Button
              type="button"
              variant={"outline"}
              className="text-base cursor-pointer w-full"
              onClick={() => reset()}
            >
              Réinitialiser
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              type="submit"
              className="bg-green hover:bg-green/60 text-base cursor-pointer w-full"
            >
              Appliquer
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
