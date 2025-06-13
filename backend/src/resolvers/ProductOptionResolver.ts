import { Product } from "../entities/Product";
import { ProductOption } from "../entities/ProductOption";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { ProductOptionQuantityUpdateInput } from "../inputs/ProductOptionInput";

@Resolver(ProductOption)
export class ProductOptionResolver {
  @Query(() => [ProductOption])
  async getProductOptions(@Arg("productId") productId: number) {
    const product = await Product.findOne({
      where: { id: productId },
    });
    return product?.product_options;
  }

  @Mutation(() => [ProductOption])
  async updateProductOptionQuantity(
    @Arg("data", () => [ProductOptionQuantityUpdateInput])
    data: ProductOptionQuantityUpdateInput[]
  ) {
    const updatedOptions: ProductOption[] = [];

    for (const item of data) {
      const option = await ProductOption.findOneByOrFail({ id: item.id });
      option.total_quantity = item.total_quantity;
      await option.save();
      updatedOptions.push(option);
    }

    return updatedOptions;
  }
}
