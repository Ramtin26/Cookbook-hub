import { useQuery } from "@tanstack/react-query";
import { checkAlreadyShared } from "../../services/apiShareRecipes";

export function useCheckAlreadyShared({ senderId, recipientEmail, recipeId }) {
  const {
    data: isAlreadyShared,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["already-shared", senderId, recipientEmail, recipeId],
    queryFn: () => checkAlreadyShared({ senderId, recipientEmail, recipeId }),
    enabled: !!senderId && !!recipientEmail && !!recipeId,
  });

  return { isAlreadyShared, isLoading, error };
}
