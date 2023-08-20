import { useMutation } from '@tanstack/react-query';

import { accountClient } from './client';
import { SignupCredentials } from './dto';
import { api } from '../base';

export function useCreateAccountService() {
  return useMutation({
    mutationFn: async (signup: SignupCredentials) => {
      const createAccount = await accountClient.createUserAccountAccountsCreatePost({
        email: signup.email,
        password: signup.password,
        user: {
          first_name: signup.first_name,
          last_name: signup.last_name,
          username: signup.username,
        },
      });

      const response = await createAccount(api);

      return response;
    },
  });
}
