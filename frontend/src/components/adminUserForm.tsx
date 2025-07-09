import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaRegUser } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/pages/AdminUsers";
import { formatDate } from "@/utils/formatDate";
import { useEditUserMutation } from "@/generated/graphql-types";
import { toast } from "react-toastify";

const formSchema = z.object({
  last_name: z.string().min(2),
  first_name: z.string().min(2),
  email: z.string(),
  phone_number: z.string().min(9),
  street: z.string().min(3),
  zipcode: z.string().min(5),
  city: z.string().min(1).min(3),
});

export default function AdminUserForm({
  modeUpdate,
  userToUpdate,
  setFormOpen,
}: {
  modeUpdate: boolean;
  userToUpdate: User;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      last_name: modeUpdate ? userToUpdate?.last_name : "",
      first_name: modeUpdate ? userToUpdate?.first_name : "",
      email: modeUpdate ? userToUpdate?.email : "",
      phone_number: modeUpdate ? userToUpdate?.phone_number : "",
      street: modeUpdate ? userToUpdate?.address?.street : "",
      zipcode: modeUpdate ? userToUpdate?.address?.zipcode : "",
      city: modeUpdate ? userToUpdate?.address?.city : "",
    },
  });

  const [editUserMutation] = useEditUserMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (modeUpdate === true) {
        const user = await editUserMutation({
          variables: {
            data: {
              id: userToUpdate.id,
              created_at: userToUpdate.created_at,
              city: values.city,
              email: values.email,
              first_name: values.first_name,
              last_name: values.last_name,
              phone_number: values.phone_number,
              zipcode: values.zipcode,
              street: values.street,
            },
          },
        });
        if (user) {
          toast.success("Utilisateur modifié avec succès");
        } else {
          toast.error(
            "Erreur dans la supression de l'utilisateur, veuillez réessayer"
          );
        }
        setFormOpen(false);
      }
    } catch (error) {
      console.error("Form submission error", error);
    }
  };

  return (
    <Form {...form}>
      <div className="max-w-4xl w-full mx-auto py-8  flex flex-col justify-center border border-gray-300 border-t-4 border-t-green rounded-md shadow-md ">
        <div className="border-b border-b-gray-300 pb-5 px-5 lg:px-10">
          <h2 className="font-semibold text-xl lg:text-2xl text-title text-green">
            {!modeUpdate
              ? "Création d'un utilisateur"
              : "Modification d'un utilisateur"}
          </h2>
          {modeUpdate && userToUpdate && (
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <FaRegUser size={15} />
              <div className="w-full text-gray-600 translate-y-[2px]">{`Utilisateur enregistré depuis le ${formatDate(
                userToUpdate.created_at
              )}`}</div>
            </div>
          )}
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4 gap-x-10 px-5 lg:px-10 my-8">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom de famille"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Prénom" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="Téléphone" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: 123 Rue des Peupliers"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Postal</FormLabel>
                  <FormControl>
                    <Input placeholder="code postal" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="ville" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-end gap-4 border-t border-gray-300 px-5 lg:px-10 pt-5">
            <Button
              className="min-w-32  hover:cursor-pointer"
              variant={"outline"}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="min-w-32 bg-green hover:bg-green/60 hover:cursor-pointer"
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
