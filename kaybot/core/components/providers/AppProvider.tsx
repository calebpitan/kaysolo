'use client';

import { ChakraProvider, ColorModeScript } from '@/chakra-ui/react';
import { theme } from '@/core/theme/theme';

import { CacheProvider } from '@chakra-ui/next-js';
import { Fragment, ReactNode } from 'react';

export interface AppProviderProps {
  children?: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Fragment>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </Fragment>
  );
}
