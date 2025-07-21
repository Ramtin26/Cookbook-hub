import { Controller, useForm } from "react-hook-form";
import { useCreateRecipe } from "./useCreateRecipe";
import { useEditRecipe } from "./useEditRecipe";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { fileToBase64 } from "../../utils/helpers";

function CreateRecipeForm({ recipeToEdit = {}, onCloseModal }) {
  const { isEditing, editRecipe } = useEditRecipe();
  const { isCreating, createRecipe } = useCreateRecipe();
  const isWorking = isEditing || isCreating;

  const { id: editId, ...editValues } = recipeToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, control } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  async function onSubmit(data) {
    const normalizedIngredients =
      typeof data.ingredients === "string"
        ? data.ingredients.split(",").map((item) => item.trim())
        : data.ingredients;

    let base64Image = "";

    if (data.image instanceof FileList && data.image[0] instanceof File) {
      base64Image = await fileToBase64(data.image[0]);
    } else if (typeof data.image === "string") {
      base64Image = data.image;
    } else {
      base64Image = "";
    }

    const recipeData = {
      ...data,
      ingredients: normalizedIngredients,
      image: base64Image,
    };

    if (isEditSession)
      editRecipe(
        { newRecipe: recipeData, id: String(editId) },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createRecipe(
        {
          id: String(Date.now()),
          popularity: 0,
          createdAt: new Date(),
          ...recipeData,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Recipe name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
            maxLength: 20,
          })}
        />
      </FormRow>

      <FormRow label="Ingredients" error={errors?.ingredients?.message}>
        <Input
          type="text"
          id="ingredients"
          disabled={isWorking}
          {...register("ingredients", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Instructions" error={errors?.instructions?.message}>
        <Textarea
          type="text"
          id="instructions"
          defaultValue=""
          {...register("instructions", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Diet" error={errors?.diet?.message}>
        <Controller
          name="diet"
          defaultValue="vegetarian"
          control={control}
          render={({ field }) => (
            <Select
              options={[
                { value: "vegetarian", label: "Vegetarian" },
                { value: "not-vegetarian", label: "Not vegetarian" },
              ]}
              {...field}
            />
          )}
        />
      </FormRow>

      <FormRow label="Preparation time" error={errors?.prepTime?.message}>
        <Input
          type="number"
          id="prepTime"
          disabled={isWorking}
          {...register("prepTime", {
            required: "This field is required",
            min: {
              value: 1,
              message: "PrepTime should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Recipe photo">
        <FileInput
          id="image"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit recipe" : "Create new recipe"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRecipeForm;
