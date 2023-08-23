'use client';

import { CacheProvider } from '@/chakra-ui/next-js';
import { ChakraProvider, ColorModeScript } from '@/chakra-ui/react';

import { theme } from '@/core/theme/theme';
import { MissingAccessTokenException, isErrorResponse } from '@/core/services';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Fragment, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { ConfigProvider } from './ConfigProvider';
import { SessionLoader } from './SessionLoader';

export interface AppProviderProps {
  children?: ReactNode;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof MissingAccessTokenException) {
        // window.location.href = '/signin';
      }
    },
  }),

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

      retry(failureCount, error) {
        if (isErrorResponse(error)) return false;
        return failureCount < 3;
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
          <ChakraProvider theme={theme}>
            <ConfigProvider>
              <SessionLoader>{children}</SessionLoader>
            </ConfigProvider>

            <ToastContainer
              className="Toastify-container--customized"
              hideProgressBar={true}
              closeButton={false}
              icon={false}
            />
          </ChakraProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Fragment>
  );
}
