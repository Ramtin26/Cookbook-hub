import { useQuery } from "@tanstack/react-query";
import { getUsersByIds } from "../../services/apiAuth";

export function useUserByIds(userIds) {
  const { data: usersById, isLoading } = useQuery({
    queryKey: ["userByIds", userIds],
    queryFn: () => getUsersByIds(userIds),
    enabled: userIds?.length > 0,
  });

  return { usersById, isLoading };
}
