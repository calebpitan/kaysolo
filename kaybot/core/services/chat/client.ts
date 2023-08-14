import { ChatApiFp, Configuration } from '@/client';

const configuration = new Configuration({ basePath: 'http://localhost:3780' });

export const chatClient = ChatApiFp(configuration);
