'use client';

import { ChakraProvider, ColorModeScript } from '@/chakra-ui/react';
import { theme } from '@/core/theme/theme';

import { CacheProvider } from '@chakra-ui/next-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fragment, ReactNode } from 'react';

export interface AppProviderProps {
  children?: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: (queryKey) => {
        return JSON.stringify(queryKey, (_, value) => {
          if (value instanceof Set) {
            return Array.from(value);
          }
          return value;
        });
      },
    },
  },
});

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Fragment>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <QueryClientProvider client={queryClient}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Fragment>
  );
}
