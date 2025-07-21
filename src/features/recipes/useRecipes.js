import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipes } from "../../services/apiRecipes";
import { PAGE_SIZE } from "../../utils/constants";

export function useRecipes() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Pagination
  const page = Number(searchParams.get("page")) || 1;

  // Filter
  const filter = searchParams.get("diet") || "all";

  // Sort
  const sortBy = searchParams.get("sortBy") || "createdAt-asc";

  // Query
  const {
    data = { recipes: [], count: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes", filter, sortBy, page],
    queryFn: () => getRecipes({ filter, sortBy, page }),
  });

  // Pre-Fetching
  if (data.count > 0) {
    const pageCount = Math.ceil(data.count / PAGE_SIZE);

    if (page < pageCount) {
      queryClient.prefetchQuery({
        queryKey: ["recipes", filter, sortBy, page + 1],
        queryFn: () => getRecipes({ filter, sortBy, page: page + 1 }),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["recipes", filter, sortBy, page - 1],
        queryFn: () => getRecipes({ filter, sortBy, page: page - 1 }),
      });
    }
  }

  return {
    recipes: data.recipes,
    count: data.count,
    isLoading,
    error,
  };
}
