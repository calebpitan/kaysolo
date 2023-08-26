import axios from 'axios';

import { createRequestErrorInterceptor, createResponseErrorInterceptor } from './interceptors';
import { ErrorPayload } from './types';

export const api = axios.create({ withCredentials: true });

const interceptedRequest = api.interceptors.request;
const interceptedResponse = api.interceptors.response;

const requestErrorInterceptor = createRequestErrorInterceptor();
const responseErrorInteceptor = createResponseErrorInterceptor(api);

interceptedRequest.use(undefined, requestErrorInterceptor);
interceptedResponse.use(undefined, responseErrorInteceptor);

export function isErrorResponse(error: unknown): error is ErrorPayload {
  if (!error) return false;

  if (typeof error === 'object' && 'message' in error && 'info' in error && 'success' in error) {
    const err = error as ErrorPayload;

    return !err.success;
  }

  return false;
}
