import { ChatApiFp, Configuration } from '@/client';
import { SERVER_BASE_URL } from '@/core/services';

const configuration = new Configuration({ basePath: SERVER_BASE_URL });

export const chatClient = ChatApiFp(configuration);
