import { Configuration } from '@/client';
import axios from 'axios';

export const SERVER_BASE_URL = process.env.SERVER_BASE_URL;
export const api = axios.create({ baseURL: SERVER_BASE_URL, withCredentials: true });
export const configuration = new Configuration({ basePath: SERVER_BASE_URL });
