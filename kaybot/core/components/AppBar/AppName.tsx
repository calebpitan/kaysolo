'use client';

import { Flex, FlexProps, useColorModeValue } from '@/chakra-ui/react';
import { Typography } from '../Typography';

export interface AppNameProps extends FlexProps {}

export const AppName = (props: AppNameProps) => {
  return (
    <Flex
      p={3}
      alignItems="center"
      color={useColorModeValue('blackAlpha.400', 'whiteAlpha.500')}
      textStyle="h4"
      {...props}
    >
      <Typography
        as="div"
        align="center"
        color="inherit"
        fontWeight={900}
        width="full"
        letterSpacing="tighter"
        userSelect="none"
      >
        KAYBOT
      </Typography>
    </Flex>
  );
};
