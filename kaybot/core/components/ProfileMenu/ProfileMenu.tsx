import { Avatar, HStack, StackProps } from '@/chakra-ui/react';

import { Typography } from '../Typography';

export interface ProfileMenuProps extends StackProps {
  name: string;
}

export const ProfileMenu = ({ name = 'Caleb Adepitan', ...rest }: ProfileMenuProps) => {
  return (
    <HStack
      ps={2}
      pe={16}
      py={2}
      backdropFilter="auto"
      backdropBlur="xl"
      backdropSaturate="180%"
      bgColor="whiteAlpha.400"
      borderRadius="full"
      width={{ base: 'auto', lg: 250 }}
      _hover={{ bgColor: 'whiteAlpha.300' }}
      {...rest}
    >
      <Avatar name={name} size={{ base: 'sm', lg: 'md' }} />

      <Typography fontWeight={600}>{name}</Typography>
    </HStack>
  );
};
