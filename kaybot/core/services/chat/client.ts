import { ChatApiFp } from '@/client';
import { configuration } from '@/core/services';

export const chatClient = ChatApiFp(configuration);
