import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteRecipe as deleteRecipeApi } from "../../services/apiRecipes";

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  const { mutate: deleteRecipe, isLoading: isDeleting } = useMutation({
    mutationFn: deleteRecipeApi,
    onSuccess: () => {
      toast.success("Recipe successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteRecipe, isDeleting };
}
