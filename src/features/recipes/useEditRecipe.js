import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditRecipe } from "../../services/apiRecipes";

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
