import { QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryProvider client={queryClient}></QueryProvider>;
};

export default QueryProvider;
