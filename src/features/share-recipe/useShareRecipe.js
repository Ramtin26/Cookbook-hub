import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { shareRecipes } from "../../services/apiShareRecipe";

export function useShareRecipe() {
  const queryClient = useQueryClient();

  const { mutate: shareRecipe, isLoading: isSharing } = useMutation({
    mutationFn: shareRecipes,
    onSuccess: () => {
      toast.success("Recipe successfully shared");
      queryClient.invalidateQueries({ queryKey: ["sharedRecipes"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { shareRecipe, isSharing };
}
