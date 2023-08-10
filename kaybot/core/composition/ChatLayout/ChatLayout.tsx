import { Box } from '@/chakra-ui/react';

import { APP_BAR_HEIGHT, AppBar } from '@/core/components/AppBar';
import { ReactNode } from 'react';

export interface ChatLayoutProps {
  children?: ReactNode;
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <Box height="full" bgGradient="linear(to-b, brand.500, transparent)">
      <AppBar />

      <Box height={`calc(100% - ${APP_BAR_HEIGHT}px)`}>{children}</Box>
    </Box>
  );
};
