import Loader from "@/components/Loader";
import { useGetAllUsersQuery } from "@/generated/graphql-types";
import { GET_USERS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const AdminUsers = () => {
  const { loading, data, fetchMore } = useGet(GET_USERS, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });
  const users = data?.getAllUsers;
  console.log(users);
  if (loading) return <Loader text={"Chargement des utilisateurs"} />;

  return (
    <div className="flex flex-col">
      <h1>Utilisateurs</h1>
    </div>
  );
};

export default AdminUsers;
