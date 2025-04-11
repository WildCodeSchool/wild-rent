import { ProductInput } from "../inputs/ProductInput";
import { Product } from "../entities/Product";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

@Resolver(Product)
export class ProductResolver {
  @Query(() => Product)
  async getProductById(@Arg("id") id: number) {
    const product = await Product.findOne({
      where: { id: id },
    });
    return product;
  }

  @Query(() => [Product])
  async getProductByCategory(@Arg("category") categoryId: number) {
    const products = await Product.find({
      order: {
        id: "ASC",
      },
      where: {
        category: {
          id: categoryId,
        },
      },
    });
    return products;
  }

  @Mutation(() => Product)
  async createProduct(@Arg("data") data: ProductInput) {
    const newProduct = await Product.save({
      name: data.name,
      description: data.description,
      price: data.price,
      pictures: data.pictures,
      product_options: data.product_options,
      category: data.category,
    });

    return await Product.findOne({
      where: { id: newProduct.id },
      relations: ["category"],
    });
  }
}
