import { Product } from "../entities/Product";
import { Resolver, Query, Arg } from "type-graphql";

@Resolver(Product)
export class ProductResolver {
  @Query(() => Product)
  async getProductById(@Arg("id") id: number) {
    const product = await Product.findOne({
      where: { id: id },
    });
    return product;
  }
}
