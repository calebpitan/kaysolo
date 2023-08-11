import { Flex, Text } from '@/chakra-ui/react';

export const APP_BAR_HEIGHT = 50;

export const AppBar = () => {
  return (
    <Flex
      p={3}
      // bgGradient="linear(to-b, brand.500, transparent)"
      color="brand.text.500"
      height={`${APP_BAR_HEIGHT}px`}
      alignItems="center"
    >
      <Text as="div" align="center" fontWeight={700} textStyle="h4" width="full">
        KayBot
      </Text>
    </Flex>
  );
};
