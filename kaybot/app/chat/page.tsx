'use client';

import { Box, Flex, VStack } from '@/chakra-ui/react';

import { ChatBox } from '@/core/components/ChatBox';
import { ChatMesssage } from '@/core/components/ChatMessage';
import { ChatTextBox } from '@/core/components/ChatTextBox';
import { ConfigContext, PrivateRoute } from '@/core/components/Providers';
import { ChatLayout } from '@/core/composition/ChatLayout';
import { useSendMessage } from '@/core/services';
import { fullname } from '@/core/utils';
import { useContext, useState } from 'react';

export interface Conversation {
  role: 'assistant' | 'user';
  message: string;
  responsed?: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { config } = useContext(ConfigContext);
  const user = config.session.user_account?.user;

  const handlePostChatMessage = useSendMessage();

  const handleChange = (message: string) => {
    setMessage(message);
  };

  const handleSend = async () => {
    const outbound_message = message;

    const newConversations = conversations.slice();

    newConversations.push({ role: 'user', message: outbound_message, responsed: false });

    setConversations(newConversations);
    setMessage('');

    const response = await handlePostChatMessage.mutateAsync({
      message_body: outbound_message,
    });

    const choices = response.data.response.choices;

    const newConversationsWithResponse = newConversations.slice(0, newConversations.length - 1);

    newConversationsWithResponse.push({ ...newConversations.at(-1)!, responsed: true });
    newConversationsWithResponse.push({ role: 'assistant', message: choices.at(0)!.message.content });

    setConversations(newConversationsWithResponse);
  };

  return (
    <PrivateRoute>
      <ChatLayout name={user ? fullname(user) : ''}>
        <Flex justifyContent="center" height="full">
          <ChatBox justifyContent="center" alignItems="flex-end" flexDirection="column">
            <VStack width="full" height="full" alignItems="flex-start" py={4} fontSize="md" overflow="auto">
              {conversations.map((c, i) => {
                return <ChatMesssage key={i} message={c.message} role={c.role} color="white" />;
              })}
            </VStack>

            <Box px={3} width="full">
              <ChatTextBox my={8} value={message} onChange={handleChange} onSend={handleSend} />
            </Box>
          </ChatBox>
        </Flex>
      </ChatLayout>
    </PrivateRoute>
  );
};

export default Chat;
