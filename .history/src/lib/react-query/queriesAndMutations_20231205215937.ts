import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { create } from "domain";
import { createUserAccount } from "../appwrite/api";
import { INewUser } from "@/types";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};
