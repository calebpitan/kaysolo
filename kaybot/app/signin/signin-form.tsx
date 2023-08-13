'use client';

import { Link } from '@/chakra-ui/next-js';
import { FormControl, Input, InputGroup, VStack } from '@/chakra-ui/react';

import { PrimaryButton } from '@/core/components/Button';
import { Form } from '@/core/components/Form';
import { InputErrorMessage } from '@/core/components/InputErrorMessage';
import { InputLabel } from '@/core/components/InputLabel';
import { PasswordInput } from '@/core/components/PasswordInput';
import { Typography } from '@/core/components/Typography';
import { SigninCredentials } from '@/core/services';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { SubmitHandler, useForm } from 'react-hook-form';

export const SigninForm = () => {
  const { register, handleSubmit, formState } = useForm<SigninCredentials>({
    resolver: classValidatorResolver(SigninCredentials),
  });

  const { errors } = formState;

  const signin: SubmitHandler<SigninCredentials> = (_data) => {};

  return (
    <Form
      px={{ base: 6, md: 16, xl: 32 }}
      py={{ base: 16, xl: 32 }}
      maxWidth="full"
      borderRadius={{ md: '2xl' }}
      width={{ base: 'full', md: 480, lg: 675 }}
      bgColor="whiteAlpha.100"
      onSubmit={handleSubmit(signin)}
    >
      <Typography mb={10} textStyle="h4" textAlign="center">
        Sign in to your account
      </Typography>

      <VStack spacing={8} justifyContent="flex-start" alignItems="flex-start">
        <FormControl variant="floating" isInvalid={Boolean(errors.email)}>
          <InputGroup>
            <Input placeholder=" " fontSize="sm" {...register('email')} />
          </InputGroup>

          <InputLabel>Email address</InputLabel>

          <InputErrorMessage message={errors.email?.message} />
        </FormControl>

        <FormControl variant="floating" isInvalid={Boolean(errors.password)}>
          <PasswordInput placeholder=" " fontSize="sm" {...register('password')} />

          <InputLabel>Password</InputLabel>

          <InputErrorMessage message={errors.password?.message} />
        </FormControl>

        <PrimaryButton width="full" type="submit">
          Sign in
        </PrimaryButton>
      </VStack>

      <VStack mt={4} alignItems="center">
        <Link color="brand.500" fontSize="sm" href="/signup">
          Create your account
        </Link>
      </VStack>
    </Form>
  );
};
