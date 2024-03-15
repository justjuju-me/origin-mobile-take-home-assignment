import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  UseQueryOptions,
} from "react-query";

type Props = {
  children: React.ReactNode;
};

export default function QueryClientComponent({ children }: Props) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { QueryClient, QueryClientProvider, useQuery, UseQueryOptions };
