import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRecipe } from "../../services/apiRecipes";
import toast from "react-hot-toast";

export function useEditRecipe() {
  const queryClient = useQueryClient();

  const { mutate: editRecipe, isLoading: isEditing } = useMutation({
    mutationFn: ({ newRecipe, id }) => createEditRecipe(newRecipe, id),
    onSuccess: () => {
      toast.success("Recipe successfully edited");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editRecipe, isEditing };
}
