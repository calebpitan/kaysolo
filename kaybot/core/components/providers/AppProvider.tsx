'use client';

import { ChakraProvider } from '@/chakra-ui/react';
import { theme } from '@/core/theme/theme';

import { CacheProvider } from '@chakra-ui/next-js';
import { ReactNode } from 'react';

export interface AppProviderProps {
  children?: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
