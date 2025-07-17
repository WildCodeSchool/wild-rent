import { TempUser } from "../entities/TempUser";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver(TempUser)
export class TempUserResolver {

  @Query(() => [TempUser])
  async getAllTempUsers( ) {
    const tempUsers = await TempUser.find( {order: {
        id: "ASC",
    },})
    
    return tempUsers;
  }

   @Mutation(() => String)
    async deleteTempUser(@Arg("id") id: number, @Ctx() context: any) {
      if(context.user.role !== "ADMIN" ){
          throw new Error("Unauthorized")
      }
      const result = await TempUser.delete(id);
      if (result.affected === 1) {
        return "L'utilisateur a bien été supprimé";
      } else {
        throw new Error("L'utilisateur n'a pas été trouvé");
      }
    }

}