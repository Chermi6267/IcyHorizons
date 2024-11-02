"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import AuthHandler from "@/components/auth/authHandler";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <AuthHandler />
          {children}
        </Provider>
      </Suspense>
    </QueryClientProvider>
  );
};
