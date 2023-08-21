import { useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { accountClient } from './client';
import { SignupCredentials } from './dto';

import { api } from '../base';

export function useCreateAccountService() {
  const queryClient = useQueryClient();

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

      // write the response data of the account creation request to the ['session_user'] cache
      queryClient.setQueryData<typeof response>(['session_user'], (data) => {
        if (!data) return response;

        const newData = produce(data, (draft) => void (draft.data = response.data));

        return newData;
      });

      return response;
    },
  });
}
