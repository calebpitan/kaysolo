'use client';

import { Link } from '@/chakra-ui/next-js';
import { Flex, FlexProps, useColorModeValue } from '@/chakra-ui/react';

import { APP_BAR_HEIGHT } from '@/core/utils';
import { Typography } from '../Typography';

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
      <Link href="/" width="full" _hover={{ textDecoration: 'none' }}>
        <Typography as="div" align="center" fontWeight={900} textStyle="h4" width="full" letterSpacing="tighter">
          KAYBOT
        </Typography>
      </Link>
    </Flex>
  );
};
