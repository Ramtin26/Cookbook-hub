import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { useUser } from "../authentication/useUser";
import { useAllRecipes } from "./useAllRecipes";
import { usePrevRelation } from "./usePrevRelation";
import { useShareRecipe } from "./useShareRecipe";

import { checkAlreadyShared } from "../../services/apiShareRecipe";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const RelationMessage = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-red-700);
  letter-spacing: 0.5px;
  margin-left: 1.2rem;

  & strong {
    text-decoration: underline;
    font-weight: 700;
    font-size: 1.7rem;
  }
`;

function ShareRecipeForm() {
  const { register, handleSubmit, formState, reset, control, setValue } =
    useForm();
  const { errors } = formState;

  const recipientEmail = useWatch({ control, name: "recipientEmail" });
  const currentRelation = useWatch({ control, name: "relation" });

  const { allRecipes, isLoading: isFetching } = useAllRecipes();
  const { user } = useUser();
  const { prevRelation } = usePrevRelation(user?.id, recipientEmail);
  const { shareRecipe, isSharing } = useShareRecipe();

  const recipeOptions = allRecipes?.map((recipe) => ({
    value: recipe.id,
    label: recipe.name,
  }));

  useEffect(
    function () {
      if (prevRelation) setValue("relation", prevRelation);
    },
    [prevRelation, setValue]
  );

  async function onSubmit(data) {
    if (!data.relation && prevRelation) {
      data.relation = prevRelation;
    }

    const shareData = {
      recipeId: data.recipeId,
      sharedBy: user.id,
      message: data.message,
      sharedWith: data.recipientEmail,
      relation: data.relation,
      sharedAt: new Date().toISOString(),
    };

    const isAlreadyShared = await checkAlreadyShared({
      senderId: shareData.sharedBy,
      recipientEmail: shareData.sharedWith,
      recipeId: shareData.recipeId,
    });

    if (isAlreadyShared) {
      toast.error("You've already shared this recipe with this person!");
      return;
    }

    shareRecipe(shareData, {
      onSettled: () => reset(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Select a recipe" error={errors?.recipeName?.message}>
        {isFetching ? (
          <SpinnerMini />
        ) : (
          <Controller
            name="recipeId"
            defaultValue={recipeOptions?.[0]?.value}
            control={control}
            disabled={isFetching || isSharing}
            render={({ field }) => (
              <Select options={recipeOptions} {...field} />
            )}
          />
        )}
      </FormRow>

      <FormRow label="Relation to recipient" error={errors?.relation?.message}>
        <Controller
          name="relation"
          control={control}
          defaultValue=""
          disabled={isSharing}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Select
              id="relation"
              options={[
                { label: "Select relation", value: "" },
                { label: "Friend", value: "friend" },
                { label: "Coworker", value: "coworker" },
                { label: "Family", value: "family" },
              ]}
              {...field}
            />
          )}
        />
        {prevRelation && recipientEmail && currentRelation !== prevRelation && (
          <RelationMessage>
            You've previously shared with this recipient as{" "}
            <strong>{prevRelation}</strong>!
          </RelationMessage>
        )}
      </FormRow>

      <FormRow label="Message" error={errors?.message?.message}>
        <Textarea
          type="text"
          id="message"
          disabled={isSharing}
          {...register("message", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Recipient email address"
        error={errors?.recipientEmail?.message}
      >
        <Input
          type="email"
          id="recipientEmail"
          disabled={isSharing}
          {...register("recipientEmail", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
            validate: (value) =>
              value !== user.email || "You cannot share recipes with yourself!",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isSharing}>Send</Button>
      </FormRow>
    </Form>
  );
}

export default ShareRecipeForm;
