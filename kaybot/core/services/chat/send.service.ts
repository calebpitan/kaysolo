import { useMutation } from '@tanstack/react-query';
import { chatClient } from './client';
import { ChatMessage } from './dto';

import { api } from '../base';

export function useSendMessage() {
  return useMutation({
    mutationFn: async (message: ChatMessage) => {
      const postChatMessage = await chatClient.chatChatMessagePost(message);

      const response = await postChatMessage(api);

      return response;
    },
  });
}
