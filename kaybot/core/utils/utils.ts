import { ThemeTypings } from '@/chakra-ui/react';

import get from 'lodash.get';

import { Choose } from './types';

import { theme } from '../theme';

export const APP_BAR_HEIGHT = 50;
export const USERNAME_REGEX = /^[A-Za-z]+(?:[_.]?[A-Za-z0-9]+)*$/;

export const getThemeColor = <T = unknown, L extends Choose<ThemeTypings, 'colors'> = string>(label: L) => {
  const field = get(theme.colors, label);
  return field ? (field as T) : label;
};
