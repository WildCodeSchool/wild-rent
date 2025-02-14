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
}