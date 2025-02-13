import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../generated/graphql-types";
import { GET_USER_INFO } from "../graphql/queries";

export const Login = () => {
  const [login] = useLoginMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
  });
  
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    login({
      variables: { data: { email: data.email, password: data.password } },
    });
  };

  return (
    <>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={"romanbeldent@gmail.com"}
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          defaultValue={"test"}
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input  className="bg-blue-400" type="submit" />
      </form>
    </>
  );
};
