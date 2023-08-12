'use client';

import { Box, FlexProps, Flex, SystemStyleObject, Textarea, IconButton, Icon } from '@/chakra-ui/react';
import { ChangeEvent } from 'react';
import { IoSend } from 'react-icons/io5';

export interface ChatTextBoxProps extends FlexProps {}

export const ChatTextBox = (props: ChatTextBoxProps) => {
  const sty: SystemStyleObject = {
    py: 0,
    fontSize: 'md',
    gridArea: '1 / 1',
    lineHeight: 'short',
  };

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const box = evt.target.parentElement;

    if (!box) return;

    box.dataset.value = evt.target.value;
  };

  return (
    <Flex
      px={3}
      py={1.5}
      width="full"
      overflow="auto"
      alignItems="center"
      position="relative"
      maxHeight={`${22 * 9}px`}
      borderRadius="xl"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray.500"
      {...props}
    >
      <Box
        width="full"
        display="inline-grid"
        position="relative"
        alignItems="center"
        _after={{
          ...sty,
          content: 'attr(data-value) " "',
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
        }}
      >
        <Textarea
          size="xs"
          px={0}
          rows={1}
          border={0}
          color="gray.100"
          width="full"
          height="full"
          resize="none"
          overflow="auto"
          onChange={handleChange}
          focusBorderColor="transparent"
          placeholder="Send a message"
          _placeholder={{ color: 'gray.500' }}
          {...(sty as any)}
        />
      </Box>

      <Box alignSelf="flex-end" ms={3} position="sticky" top={'calc(100% - 2rem)'} right={0}>
        <IconButton aria-label="Send" borderRadius="xl" size="sm">
          <Icon as={IoSend} />
        </IconButton>
      </Box>
    </Flex>
  );
};
