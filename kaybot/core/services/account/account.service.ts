import { useQuery } from '@tanstack/react-query';

import { accountClient } from './client';

import { api } from '../base';
import { BaseQueryServiceOptions } from '../types';
import { Account } from '@/client';

export interface IdentifyUserAccountService<S> extends BaseQueryServiceOptions<Account, unknown, S> {}

export function useIdentifyUserAccountService<S>(options: IdentifyUserAccountService<S>) {
  return useQuery({
    queryKey: ['session_user'],
    enabled: options.trigger,
    queryFn: async () => {
      const identifyUserAccount = await accountClient.identifyUserAccountAccountsMeGet();

      const response = await identifyUserAccount(api);

      return response;
    },

    select: options.select,
  });
}
