import { Flex } from '@/chakra-ui/react';

import { ChatBox } from '@/core/components/ChatBox';
import { ChatTextBox } from '@/core/components/ChatTextBox';
import { ChatLayout } from '@/core/composition/ChatLayout';

const Chat = () => {
  return (
    <ChatLayout>
      <Flex justifyContent="center" height="full">
        <ChatBox px={3} justifyContent="center" alignItems="flex-end">
          <ChatTextBox mb={8} />
        </ChatBox>
      </Flex>
    </ChatLayout>
  );
};

export default Chat;
