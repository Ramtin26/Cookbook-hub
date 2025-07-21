import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getSharedRecipesAfterDate } from "../../services/apiShareRecipe";

export function useSharedRecipes() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays);

  const { data: sharedRecipes, isLoading } = useQuery({
    queryKey: ["sharedRecipes", `last-${numDays}`],
    queryFn: () => getSharedRecipesAfterDate(queryDate),
  });

  return { sharedRecipes, isLoading, numDays };
}
