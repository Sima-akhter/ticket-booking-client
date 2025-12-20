

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email && !loading, 
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user.email}/role`
      );
      console.log(res.data)
      return res.data;
    },
  });

  return [data, isLoading];
};

export default useRole;
