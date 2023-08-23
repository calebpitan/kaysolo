import { Box, Flex } from '@/chakra-ui/react';

import { AppBar } from '@/core/components/AppBar';
import { ProfileMenu } from '@/core/components/ProfileMenu';
import { APP_BAR_HEIGHT } from '@/core/utils';
import { ReactNode } from 'react';

export interface ChatLayoutProps {
  name: string;
  children?: ReactNode;
}

export const ChatLayout = ({ children, name }: ChatLayoutProps) => {
  return (
    <Box height="full" bgImage="url(/images/chat-background.png)" bgRepeat="no-repeat" bgSize="cover">
      <AppBar color="whiteAlpha.600" />

      <Flex height={`calc(100% - ${APP_BAR_HEIGHT}px)`} width="full">
        <Box px={6} py={8} flexShrink={0} alignSelf="flex-end" display={{ base: 'none', lg: 'block' }}>
          <ProfileMenu name={name} />
        </Box>

        <Box height="full" width="full">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
