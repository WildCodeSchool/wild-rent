import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation, UserInput } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [registerMutation] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInput>();
  const onSubmit: SubmitHandler<UserInput> = (data) => {
    console.log("data", data);
    registerMutation({
      variables: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          email: data.email,
          password: data.password,
        },
      },
      onCompleted: (result) => {
        console.log("result", result);
        navigate("/confirm");
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={"Jojo"}
          placeholder="Prénom"
          {...register("first_name", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          defaultValue={"L'abricot"}
          placeholder="Nom de famille"
          {...register("last_name", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          defaultValue={"0683201456"}
          placeholder="Numéro de téléphone"
          {...register("phone_number", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input
          defaultValue={"test"}
          placeholder="Mot de passe"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input
          defaultValue={"personne@gmail.com"}
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </>
  );
};
