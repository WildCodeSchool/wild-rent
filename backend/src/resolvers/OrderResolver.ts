import { Order } from "../entities/Order";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { OrderInput } from "../inputs/OrderInput";
import { User } from "../entities/User";

@Resolver(Order)
export class OrderResolver {
  @Query(() => [Order])
  async getAllOrders() {
    return await Order.find();
  }

  @Mutation(() => Order)
  async createNewOrder(@Arg("data") data: OrderInput) {
    const user = await User.findOne({ where: { id: data.userId } });
    if (!user) {
      throw new Error("User not found");
    }
    const products_in_orderIds = data.products_in_orderIds ?? [];
    const newOrder = Order.create({
      total_price: data.total_price,
      rental_start_date: data.rental_start_date || new Date(),
      rental_end_date: data.rental_end_date,
      status: "PENDING",
      user: user,
      created_at: data.created_at || new Date(),
      products_in_order: products_in_orderIds.map((productId) => {
        return { productId: productId } as any;
      }),
    });
    return await newOrder.save();
  }
}
