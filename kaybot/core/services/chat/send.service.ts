import { useMutation } from '@tanstack/react-query';
import { chatClient } from './client';
import { MessageCreateConcrete } from './dto';

import { api } from '../base';

export function useSendMessage() {
  return useMutation({
    mutationFn: async (message: MessageCreateConcrete) => {
      const postChatMessage = await chatClient.createMessageChatsMessagePost(message);

      const response = await postChatMessage(api);

      return response;
    },
  });
}
