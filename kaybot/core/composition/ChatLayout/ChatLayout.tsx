import { Box } from '@/chakra-ui/react';

import { AppBar } from '@/core/components/AppBar';
import { APP_BAR_HEIGHT } from '@/core/utils';
import { ReactNode } from 'react';

export interface ChatLayoutProps {
  children?: ReactNode;
}

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <Box height="full" bgImage="url(/images/chat-background.png)" bgRepeat="no-repeat" bgSize="cover">
      <AppBar color="whiteAlpha.600" />

      <Box height={`calc(100% - ${APP_BAR_HEIGHT}px)`}>{children}</Box>
    </Box>
  );
};
