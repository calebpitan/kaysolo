import { Configuration } from '@/client';

import { getToken } from '../utils';

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL!;

export class MissingAccessTokenException extends Error {
  name = MissingAccessTokenException.name;
}

function getServerBaseURL() {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return SERVER_BASE_URL;

  const clientAddress = new URL(window.location.href);
  const serverAddress = new URL(SERVER_BASE_URL);

  const serverBaseUrl = `${clientAddress.protocol}//${clientAddress.hostname}:${serverAddress.port}`;

  return serverBaseUrl;
}

function getAccessToken() {
  const token = getToken();

  if (!token) return Promise.reject(new MissingAccessTokenException('No access token!'));

  return Promise.resolve(token);
}

export const configuration = new Configuration({ basePath: getServerBaseURL(), accessToken: getAccessToken });
