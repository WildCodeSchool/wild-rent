import { TempUser } from "../entities/TempUser";
import { Query, Resolver } from "type-graphql";

@Resolver(TempUser)
export class TempUserResolver {

  @Query(() => [TempUser])
  async getAllTempUsers( ) {
    const tempUsers = await TempUser.find( {order: {
        id: "ASC",
    },})
    
    return tempUsers;
  }

}