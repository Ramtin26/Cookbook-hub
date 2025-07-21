import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/apiAuth";

export function useAllUsers() {
  const {
    data: allUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
  });

  return { allUsers, isLoading, error };
}
