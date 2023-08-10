import { Flex } from '@/chakra-ui/react';

import { ChatBox } from '@/core/components/ChatBox/ChatBox';
import { ChatLayout } from '@/core/composition/ChatLayout';

const Chat = () => {
  return (
    <ChatLayout>
      <Flex justifyContent="center" height="full">
        <ChatBox alignItems="center">

        </ChatBox>
      </Flex>
    </ChatLayout>
  );
};

export default Chat;
