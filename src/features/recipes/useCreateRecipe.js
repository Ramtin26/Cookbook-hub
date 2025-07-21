import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditRecipe } from "../../services/apiRecipes";

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  const { mutate: createRecipe, isLoading: isCreating } = useMutation({
    mutationFn: createEditRecipe,
    onSuccess: () => {
      toast.success("New recipe successfully created");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createRecipe };
}
