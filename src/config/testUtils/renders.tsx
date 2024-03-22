import React from "react";
import { render, RenderResult } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";

export function renderComponent(
  children: JSX.Element | JSX.Element[]
): RenderResult {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>{children}</NavigationContainer>
    </QueryClientProvider>
  );
}
