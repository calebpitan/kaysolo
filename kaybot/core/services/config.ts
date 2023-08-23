import { Configuration } from '@/client';

import { getToken } from '../utils';

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

export class MissingAccessTokenException extends Error {
  name = MissingAccessTokenException.name;
}

function getAccessToken() {
  const token = getToken();

  if (!token) return Promise.reject(new MissingAccessTokenException('No access token!'));

  return Promise.resolve(token);
}

export const configuration = new Configuration({ basePath: SERVER_BASE_URL, accessToken: getAccessToken });
