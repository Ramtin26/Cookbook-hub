import { useQuery } from "@tanstack/react-query";
import { getPrevRelation } from "../../services/apiShareRecipe";

export function usePrevRelation(senderId, recipientEmail) {
  const { data: prevRelation, isLoading } = useQuery({
    queryKey: ["previousRelation", senderId, recipientEmail],
    queryFn: () => getPrevRelation({ senderId, recipientEmail }),
    enabled: !!senderId && !!recipientEmail,
  });

  return { prevRelation, isLoading };
}
