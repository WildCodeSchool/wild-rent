import { useNavigate, useParams } from "react-router-dom";
import { useConfirmEmailMutation } from "../generated/graphql-types";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";

const ConfirmEmailPage = () => {
    type Inputs = {
        code: string;
    }

    const [confirmEmail] = useConfirmEmailMutation();
    const navigate = useNavigate();
    const { code } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        confirmEmail({
            variables: { codeByUser: data.code },
            onCompleted: () => {
                navigate("/")
                toast.success("Votre compte a été créé avec succès !")
            },
            onError: () => {
                toast.error("Vous avez entré un mauvais code");
            }
        })
    };
    return (
        <>
            <h2>Rentrez votre code afin de créer votre compte TGC !</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    defaultValue={code}
                    type="password"
                    {...register("code", { required: true })}
                />
                {errors.code && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </>
    );
}

export default ConfirmEmailPage;