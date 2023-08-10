import { Flex, FlexProps } from '@/chakra-ui/react';

import { ReactNode } from 'react';
import { APP_BAR_HEIGHT } from '../AppBar';

export interface ChatBoxProps extends FlexProps {
  children: ReactNode;
}

export const ChatBox = ({ children, ...rest }: ChatBoxProps) => {
  return (
    <Flex
      backdropFilter="auto"
      backdropBlur="xl"
      backdropSaturate="180%"
      bgColor="whiteAlpha.700"
      borderRadius="lg"
      position="absolute"
      height={`calc(100% - ${APP_BAR_HEIGHT}px)`}
      width={600}
      top={`${APP_BAR_HEIGHT}px`}
      {...rest}
    >
      {children}
    </Flex>
  );
};
