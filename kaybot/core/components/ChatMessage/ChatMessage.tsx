import { Avatar, Box, HStack, StackProps } from '@/chakra-ui/react';
import { Typography } from '../Typography';

export interface ChatMessageProps extends StackProps {
  message: string;
  role: 'user' | 'assistant';
}

export const ChatMesssage = ({ message, role, ...rest }: ChatMessageProps) => {
  return (
    <HStack
      px={3}
      py={2}
      width="full"
      alignItems="baseline"
      bgColor={role === 'assistant' ? 'whiteAlpha.100' : undefined}
      {...rest}
    >
      <Avatar name={role} size="sm" position="sticky" top={0}/>

      <Box>
        <Typography whiteSpace="pre-wrap">{message}</Typography>
      </Box>
    </HStack>
  );
};
