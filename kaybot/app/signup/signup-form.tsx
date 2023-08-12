import { FormControl, HStack, Input, InputGroup, VStack } from '@/chakra-ui/react';
import { PrimaryButton } from '@/core/components/Button';

import { Form } from '@/core/components/Form';
import { InputLabel } from '@/core/components/InputLabel';
import { PasswordInput } from '@/core/components/PasswordInput';
import { Typography } from '@/core/components/Typography';

export const SignupForm = () => {
  return (
    <Form
      px={{ base: 6, md: 16, xl: 32 }}
      py={{ base: 16, xl: 32 }}
      maxWidth="full"
      borderRadius={{ md: '2xl' }}
      width={{ base: 'full', md: 480, lg: 675 }}
      bgColor="whiteAlpha.100"
    >
      <Typography mb={10} textStyle="h4" textAlign="center">
        Create your account
      </Typography>

      <VStack spacing={8} justifyContent="flex-start" alignItems="flex-start">
        <HStack spacing={4} width="full">
          <FormControl variant="floating">
            <InputGroup>
              <Input placeholder=" " fontSize="sm" />
            </InputGroup>
            <InputLabel>First name</InputLabel>
          </FormControl>

          <FormControl variant="floating">
            <InputGroup>
              <Input placeholder=" " fontSize="sm" />
            </InputGroup>
            <InputLabel>Last name</InputLabel>
          </FormControl>
        </HStack>

        <FormControl variant="floating">
          <InputGroup>
            <Input placeholder=" " fontSize="sm" />
          </InputGroup>
          <InputLabel>Username</InputLabel>
        </FormControl>

        <FormControl variant="floating">
          <InputGroup>
            <Input placeholder=" " fontSize="sm" />
          </InputGroup>
          <InputLabel>Email address</InputLabel>
        </FormControl>

        <FormControl variant="floating">
          <PasswordInput placeholder=" " fontSize="sm" />

          <InputLabel>Password</InputLabel>
        </FormControl>

        <PrimaryButton width="full">Create account</PrimaryButton>
      </VStack>
    </Form>
  );
};
