import { ProductOption } from "../entities/ProductOption";
import { ProductInOrder } from "../entities/ProductInOrder";

import { Resolver, Query, Arg } from "type-graphql";
import { OptionInventory } from "../entities/Inventory";

@Resolver()
export class InventoryResolver {
  @Query(() => [OptionInventory])
  async getInventoryByOptions( @Arg("startDate") startDate: string,
    @Arg("endDate") endDate: string) {
    
    const productOptions = await ProductOption.find({relations: ["product"]})
   
    const reservations = await ProductInOrder.find({relations: ["productOption.product"]})

    const getAllDates = (startDate: string, endDate:string)=>{
        const allDates= [];
        let currentDate = new Date(startDate)
        const lastDate = new Date(endDate);
        while(currentDate <= lastDate){
            allDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate()+1)
        }
        return allDates;
    }
    
    const allDates = getAllDates(startDate, endDate)

    let inventory = []
   
    for (const option of productOptions){
        const optionInventory: OptionInventory = {
            product: option.product.name,
            option: option.size,
            totalQty: option.total_quantity,
            reservations: []
        }
        for (const date of allDates) {
            const reservedItems = reservations.filter((item)=> {
                return (item.productOption.id === option.id &&
                new Date(item.order.rental_start_date) <= date &&
                new Date(item.order.rental_end_date) >= date)
            })

            if(reservedItems.length > 0) {
                const reservedQty = reservedItems.reduce((sum, item) => sum + item.quantity, 0);
                const availableQty = option.total_quantity - reservedQty;
                optionInventory.reservations.push({
                    date,
                    reservedQty,
                    availableQty
                });
            }
                
        }
        inventory.push(optionInventory)
    }
    
    return inventory
  }
}