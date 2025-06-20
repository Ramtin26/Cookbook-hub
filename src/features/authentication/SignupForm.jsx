import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useSignup } from "./useSignup";
import { useUser } from "./useUser";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { user } = useUser();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    const newUser = {
      id: uuidv4(),
      username: fullName,
      email,
      password,
      savedRecipes: [],
      avatarImage: "",
    };
    signup(newUser, {
      onSettled: () => {
        navigate("/dashboard");
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
            validate: async (value) => {
              const res = await fetch(
                `http://localhost:3001/users?email=${value}`
              );
              const existing = await res.json();
              return existing.length === 0 || "Email is already taken";
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: 8,
            message: "Password needs a minimum of 8 characters",
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password needs to match",
          })}
        />
      </FormRow>

      <FormRow>
        {user && (
          <Button
            variation="secondary"
            type="reset"
            disabled={isLoading}
            onClick={reset}
          >
            Cancel
          </Button>
        )}
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
