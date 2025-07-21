import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserFromServer } from "../../services/apiAuth";
import { updateUserVoteAndPopularity } from "../../services/apiVote";

export function useVoteRecipe() {
  const queryClient = useQueryClient();

  const { mutate: vote, isLoading: isPending } = useMutation({
    mutationFn: ({ recipeId, voteType, user }) =>
      updateUserVoteAndPopularity({ recipeId, voteType, user }),
    onSuccess: async (_, { user, recipeId }) => {
      const freshUser = await getUserFromServer(user.id);
      queryClient.setQueryData(["user"], freshUser);

      queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
    },
    onError: (err) => {
      console.error("Vote failed:", err);
    },
  });

  return { vote, isPending };
}
