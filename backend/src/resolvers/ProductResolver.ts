import { ProductInput, ProductSearchOptions } from "../inputs/ProductInput";
import { Product } from "../entities/Product";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Picture } from "../entities/Picture";
import { ProductOption } from "../entities/ProductOption";
import { Category } from "../entities/Category";
import { FindManyOptions, Raw } from "typeorm";

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
  async searchProductsByOptions(
    @Arg("options")
    options: ProductSearchOptions
  ) {
    let findOptions: FindManyOptions = {
      where: {
        name: Raw(
          (alias) => `unaccent(${alias}) ILIKE unaccent('%${options.name}%')`
        ),
      },
    };
    if (options.categoryId) {
      findOptions.where = {
        ...findOptions.where,
        category: { id: options.categoryId },
      };
    }
    if (options.productOption) {
      findOptions.where = {
        ...findOptions.where,
        product_options: { size: options.productOption },
      };
    }
    return await Product.find(findOptions);
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

  @Mutation(() => Product)
  async createProduct(@Arg("data") data: ProductInput) {
    const pictures = data.pictures?.map((pic) => {
      return Picture.create({ url: pic.url });
    });

    const productOptions = data.product_options?.map((opt) =>
      ProductOption.create({
        size: opt.size,
        total_quantity: opt.total_quantity,
      })
    );

    const category = await Category.findOneByOrFail({ id: data.category?.id });

    const newProduct = await Product.create({
      name: data.name,
      description: data.description,
      price: data.price,
      pictures: pictures,
      product_options: productOptions,
      category: category,
    });

    return await newProduct.save();
  }
}
