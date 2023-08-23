'use client';

import { Account } from '@/client';

import { produce } from 'immer';
import { Dispatch, ReactNode, createContext, useMemo, useReducer } from 'react';

export type SessionLoaderState = 'loaded' | 'loading' | 'reloading';

export interface SessionContext {
  user_account: Account | null;
}

export interface Config {
  has_active_session: boolean;
  session: SessionContext;
  session_loader_state: SessionLoaderState;
}

export interface ConfigContext {
  config: Config;
  updateConfig: Dispatch<Actions>;
}

export interface ConfigProviderProps {
  children: ReactNode;
}

export interface UpdateUserAccountAction {
  type: ActionType.UPDATE_USER_ACCOUNT;
  payload: Account | null;
}

export interface UpdateHasActiveSessionAction {
  type: ActionType.UPDATE_HAS_ACTIVE_SESSION;
  payload: boolean;
}

export interface UpdateSessionLoaderStateAction {
  type: ActionType.UPDATE_SESSION_LOADER_STATE;
  payload: SessionLoaderState;
}

export enum ActionType {
  UPDATE_USER_ACCOUNT = 'update_user_account',
  UPDATE_HAS_ACTIVE_SESSION = 'update_has_active_session',
  UPDATE_SESSION_LOADER_STATE = 'update_session_loader_state',
}

export type Actions = UpdateUserAccountAction | UpdateHasActiveSessionAction | UpdateSessionLoaderStateAction;

class ConfigContextActions {
  createUserAccountUpdateAction(account: Account | null): UpdateUserAccountAction {
    return { type: ActionType.UPDATE_USER_ACCOUNT, payload: account };
  }

  createHasActiveSessionUpdateAction(hasActiveSession: boolean): UpdateHasActiveSessionAction {
    return { type: ActionType.UPDATE_HAS_ACTIVE_SESSION, payload: hasActiveSession };
  }

  createSessionLoaderStateUpdateAction(sessionLoaderState: SessionLoaderState): UpdateSessionLoaderStateAction {
    return { type: ActionType.UPDATE_SESSION_LOADER_STATE, payload: sessionLoaderState };
  }
}

export const actions = new ConfigContextActions();

const defaultContext: ConfigContext = {
  config: { has_active_session: false, session: { user_account: null }, session_loader_state: 'loading' },
  updateConfig: () => void 0,
};

function reducer(state: Config, action: Actions) {
  switch (action.type) {
    case ActionType.UPDATE_USER_ACCOUNT: {
      const nextState = produce(state, (draft) => void (draft.session.user_account = action.payload));
      return nextState;
    }

    case ActionType.UPDATE_HAS_ACTIVE_SESSION: {
      const nextState = produce(state, (draft) => void (draft.has_active_session = action.payload));
      return nextState;
    }

    case ActionType.UPDATE_SESSION_LOADER_STATE: {
      const nextState = produce(state, (draft) => void (draft.session_loader_state = action.payload));
      return nextState;
    }

    default:
      return state;
  }
}

export const ConfigContext = createContext<ConfigContext>(defaultContext);

export const ConfigProvider = (props: ConfigProviderProps) => {
  const [state, dispacth] = useReducer(reducer, defaultContext.config);

  const context = useMemo(() => ({ config: state, updateConfig: dispacth }), [state]);

  return <ConfigContext.Provider value={context}>{props.children}</ConfigContext.Provider>;
};
