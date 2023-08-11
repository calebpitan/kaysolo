import { Flex } from '@/chakra-ui/react';

import { ChatBox } from '@/core/components/ChatBox/ChatBox';
import { ChatLayout } from '@/core/composition/ChatLayout';
import { ChatTextBox } from '@/core/composition/ChatTextBox';

const Chat = () => {
  return (
    <ChatLayout>
      <Flex justifyContent="center" height="full">
        <ChatBox px={3} justifyContent="center" alignItems="flex-end">
          <ChatTextBox mb={4} />
        </ChatBox>
      </Flex>
    </ChatLayout>
  );
};

export default Chat;
