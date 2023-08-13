'use client';

import { Flex, FlexProps, useColorModeValue } from '@/chakra-ui/react';
import { Typography } from '../Typography';
import { APP_BAR_HEIGHT } from '@/core/utils';

export interface AppBarProps extends FlexProps {}

export const AppBar = (props: AppBarProps) => {
  return (
    <Flex
      p={3}
      alignItems="center"
      height={`${APP_BAR_HEIGHT}px`}
      color={useColorModeValue('blackAlpha.400', 'whiteAlpha.500')}
      {...props}
    >
      <Typography as="div" align="center" fontWeight={900} textStyle="h4" width="full" letterSpacing="tighter">
        KAYBOT
      </Typography>
    </Flex>
  );
};
