import { QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
const queryClient = new QueryClient();
const QueryProvider = ({ children }: { children: ReactNode }) => {

  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};

export default QueryProvider;