import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
const queryClient = new QueryClient();
export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return <QueryProvider client={queryClient}>{children}</QueryProvider>;
};
