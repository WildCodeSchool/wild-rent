import { ProductOption } from "../entities/ProductOption";
import { ProductInOrder } from "../entities/ProductInOrder";

import { Resolver, Query, Arg } from "type-graphql";
import { OptionAvailability, OptionInventory } from "../entities/Inventory";

@Resolver()
export class InventoryResolver {
  @Query(() => [OptionInventory])
  async getInventoryByOptions(
    @Arg("startDate") startDate: string,
    @Arg("endDate") endDate: string,
    @Arg("productId", { nullable: true }) productId?: number
  ) {
    const getAllDates = (startDate: string, endDate: string) => {
      const allDates = [];
      let currentDate = new Date(startDate);
      const lastDate = new Date(endDate);
      while (currentDate <= lastDate) {
        allDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return allDates;
    };

    const allDates = getAllDates(startDate, endDate);

    let productOptions;
    let reservations;

    if (productId) {
      productOptions = await ProductOption.find({
        where: { id: productId },
        relations: ["product"],
      });
      reservations = await ProductInOrder.find({
        where: { productOption: { id: productId } },
        relations: ["productOption.product"],
      });
    } else {
      productOptions = await ProductOption.find({ relations: ["product"] });
      reservations = await ProductInOrder.find({
        relations: ["productOption.product"],
      });
    }

    let inventory = [];

    for (const option of productOptions) {
      const optionInventory: OptionInventory = {
        id: option.id,
        product: option.product.name,
        category: option.product.category,
        option: option.size,
        totalQty: option.total_quantity,
        reservations: [],
      };
      for (const date of allDates) {
        const reservedItems = reservations.filter((item) => {
          return (
            item.productOption.id === option.id &&
            new Date(item.order.rental_start_date) <= date &&
            new Date(item.order.rental_end_date) >= date
          );
        });

        if (reservedItems.length > 0) {
          const reservedQty = reservedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const availableQty = option.total_quantity - reservedQty;
          optionInventory.reservations.push({
            date,
            reservedQty,
            availableQty,
          });
        }
      }
      inventory.push(optionInventory);
    }

    return inventory;
  }

  @Query(() => OptionAvailability)
  async checkProductAvailability(
    @Arg("startDate") startDate: string,
    @Arg("endDate") endDate: string,
    @Arg("product_id") productId: number,
    @Arg("quantity") quantity: number
  ) {
    const productInventory = await this.getInventoryByOptions(
      startDate,
      endDate,
      productId
    );
    const reservations = productInventory[0].reservations;

    const minAvailableQty =
      reservations.length > 0
        ? Math.min(...reservations.map((r) => r.availableQty))
        : productInventory[0].totalQty;

    if (minAvailableQty >= quantity) {
      return {
        productOptionId: productId,
        available: true,
        availableQty: minAvailableQty,
      };
    }
    return {
      productOptionId: productId,
      available: false,
      availableQty: minAvailableQty,
    };
  }
}
