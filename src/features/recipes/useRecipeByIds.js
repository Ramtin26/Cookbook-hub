import { useQuery } from "@tanstack/react-query";
import { getRecipesbyIds } from "../../services/apiRecipes";

export function useRecipeByIds(recipeIds) {
  const {
    data: recipesById,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipeByIds", recipeIds],
    queryFn: () => getRecipesbyIds(recipeIds),
    enabled: recipeIds?.length > 0,
  });

  return { recipesById, isLoading, error };
}
