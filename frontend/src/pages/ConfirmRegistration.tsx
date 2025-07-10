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
import { useAddUserConfirmationMutation } from "@/generated/graphql-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(1).min(8),
    confirm_password: z.string().min(1).min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // attach error to confirm_password field
  });

const ConfirmRegistration = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const params = useParams();
  const { code } = params;

  const [addUserConfirmationMutation] = useAddUserConfirmationMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await addUserConfirmationMutation({
        variables: {
          randomCode: code || "",
          password: values.confirm_password,
        },
      });
      if (result) {
        toast.success("Enregistrement complété avec succès");
        navigate("/login");
      } else {
        toast.error(
          "Votre enregistrement n'a pas pu être finalisé, veuillez contacter notre service client"
        );
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-start m-5 lg:m-10 max-w-3xl">
        <h1 className="font-bold lg:text-lg">
          Créez votre mot de passe pour compléter votre enregistrement:
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10 w-full"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
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
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-green hover:bg-green/70">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
