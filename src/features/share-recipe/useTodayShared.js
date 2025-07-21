import { useQuery } from "@tanstack/react-query";
import { getRecipesTodayShared } from "../../services/apiShareRecipe";

export function useTodayShared() {
  const { isLoading, data: sharedToday } = useQuery({
    queryKey: ["today-shared"],
    queryFn: getRecipesTodayShared,
  });

  return { isLoading, sharedToday };
}
