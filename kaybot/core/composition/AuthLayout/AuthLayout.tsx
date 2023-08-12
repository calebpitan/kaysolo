import { Flex, FlexProps } from '@/chakra-ui/react';
import { ReactNode } from 'react';

export interface AuthLayoutProps extends FlexProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Flex height="full" justifyContent="center" alignItems="center">
      {children}
    </Flex>
  );
};
