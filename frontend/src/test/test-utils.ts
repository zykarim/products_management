import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};
