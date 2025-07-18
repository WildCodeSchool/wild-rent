import {
  CreateNewAddressInput,
  useCreateNewAddressMutation,
  useWhoamiQuery,
} from "@/generated/graphql-types";
import { GET_USER_INFO } from "@/graphql/queries";
import { client } from "@/main";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddressForm() {
  const whoami = useWhoamiQuery();
  const userId = whoami.data?.whoami?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewAddressInput>();

  const [createNewAddressMutation] = useCreateNewAddressMutation();

  const onSubmit: SubmitHandler<CreateNewAddressInput> = async (data) => {
    await createNewAddressMutation({
      variables: {
        data: {
          userId: userId,
          street: data.street,
          city: data.city,
          zipcode: data.zipcode,
          country: data.country,
        },
      },
      onCompleted: async () => {
        toast.success("Vous avez ajouté une nouvelle adresse de facturation !");
        await client.refetchQueries({ include: [GET_USER_INFO] });
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2 space-y-2 w-3/4 max-w-md"
    >
      <input
        type="text"
        placeholder="Rue"
        {...register("street", { required: true })}
        className="border rounded w-full p-2"
        name="street"
      />
      {errors.street && (
        <span className="text-red-500 text-sm">Ce champ est requis</span>
      )}
      <input
        type="text"
        placeholder="Ville"
        {...register("city", { required: true })}
        className="border rounded w-full p-2"
        name="city"
      />
      {errors.city && (
        <span className="text-red-500 text-sm">Ce champ est requis</span>
      )}
      <input
        type="text"
        placeholder="Code postal"
        {...register("zipcode", { required: true })}
        className="border rounded w-full p-2"
        name="zipcode"
      />
      {errors.zipcode && (
        <span className="text-red-500 text-sm">Ce champ est requis</span>
      )}
      <input
        type="text"
        placeholder="Pays"
        {...register("country", { required: true })}
        className="border rounded w-full p-2"
        name="country"
      />
      {errors.country && (
        <span className="text-red-500 text-sm">Ce champ est requis</span>
      )}
      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        Enregistrer l'adresse
      </button>
    </form>
  );
}

export default AddressForm;
