
import { Product } from "../entities/Product";
import { Resolver, Query, Arg } from "type-graphql";

@Resolver(Product)
export class ProductResolver {
  @Query(() => Product)
  async getProductById(@Arg("id") id: number) 
  {
    const product = await Product.findOne({
      where: { id: id },
    });
    return product;
  }

  @Query(() => [Product])
  async getProductByCategory(@Arg("category") categoryId: number)
  {
    const products= await Product.find({
        order: {
          id: "ASC"
        },
        where: {
          category: {
            id: categoryId
          },
        }
      })
    return products;
  }

  @Query(() => [Product])
  async getProductWithFilters( @Arg("categoryId") categoryId: number,
  @Arg("minPrice") minPrice: number,
  @Arg("maxPrice") maxPrice: number,
  @Arg("tags", () => [String]) tags: string[]
)
  {
    const queryBuilder = Product.createQueryBuilder("product")
    .leftJoinAndSelect("product.category", "category")
    .leftJoinAndSelect("product.tags", "tag")
    .leftJoinAndSelect("product.pictures", "pictures")
    .where("product.categoryId = :categoryId", {categoryId: categoryId})
    .andWhere("product.price <= :maxPrice", { maxPrice: maxPrice })
    .andWhere("product.price >= :minPrice", { minPrice: minPrice })

    if(tags && tags.length >0){
      queryBuilder.andWhere("tag.label IN (:...tags)", {tags})
    }

    const products= await queryBuilder.getMany()
    
    return products;
  }
}