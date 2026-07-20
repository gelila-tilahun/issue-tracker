'use client';

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  // Creating the client inside useState ensures it is a singleton 
  // on the client side and doesn't share state between different requests.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60s
        retry: 3,
      },
    },
  }));

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;