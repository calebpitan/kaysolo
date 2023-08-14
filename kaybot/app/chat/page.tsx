'use client';

import { Box, Flex, VStack } from '@/chakra-ui/react';

import { ChatBox } from '@/core/components/ChatBox';
import { ChatTextBox } from '@/core/components/ChatTextBox';
import { ChatLayout } from '@/core/composition/ChatLayout';
import { useSendMessage } from '@/core/services';
import { useState } from 'react';

export interface ChatDialogue {
  role: 'assistant' | 'user';
  message: string;
  responsed?: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<ChatDialogue[]>([]);
  const handlePostChatMessage = useSendMessage();

  const handleSend = async () => {
    const outbound_message = message;

    setChat([...chat, { role: 'user', message: outbound_message, responsed: false }]);
    setMessage('');

    const response = await handlePostChatMessage.mutateAsync({
      message_body: outbound_message,
    });

    const choices = response.data.response.choices;

    const newChat = chat.slice(0, chat.length - 1);

    newChat.push({ ...chat.at(-1)!, responsed: true });
    newChat.push({ role: 'assistant', message: choices.at(0)!.message.content });

    setChat(newChat);
  };

  const handleChange = (message: string) => {
    setMessage(message);
  };

  return (
    <ChatLayout>
      <Flex justifyContent="center" height="full">
        <ChatBox px={3} justifyContent="center" alignItems="flex-end" flexDirection="column">
          <VStack width="full" height="full" alignItems="flex-start" py={4} px={1} fontSize="sm" overflow="auto">
            {chat.map((c) => {
              return (
                <Box key={c.message} p={3} bgColor="whiteAlpha.600" borderRadius="2xl" whiteSpace="pre-wrap">
                  {c.message}
                </Box>
              );
            })}
          </VStack>

          <ChatTextBox my={8} onChange={handleChange} onSend={handleSend} />
        </ChatBox>
      </Flex>
    </ChatLayout>
  );
};

export default Chat;
