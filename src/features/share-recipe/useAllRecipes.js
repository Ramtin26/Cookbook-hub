import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../../services/apiRecipes";

export function useAllRecipes() {
  const {
    isLoading,
    data: allRecipes,
    error,
  } = useQuery({
    queryKey: ["all-recipes"],
    queryFn: getAllRecipes,
  });

  return { isLoading, allRecipes, error };
}
