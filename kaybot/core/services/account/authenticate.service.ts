import { useMutation } from '@tanstack/react-query';

import { accountClient } from './client';
import { SigninCredentials } from './dto';
import { api } from '../base';

export function useAuthenticateAccountService() {
  return useMutation({
    mutationFn: async (signin: SigninCredentials) => {
      const authenticateAccount = await accountClient.authenticateUserAccountAccountsAuthenticatePost(
        signin.email,
        signin.password,
      );

      const response = await authenticateAccount(api);

      return response;
    },
  });
}
