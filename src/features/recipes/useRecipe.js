import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../../services/apiRecipes";

export function useRecipe(recipeId) {
  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => getRecipe(recipeId),
    enabled: !!recipeId,
    retry: false,
  });

  return { isLoading, recipe, error };
}
