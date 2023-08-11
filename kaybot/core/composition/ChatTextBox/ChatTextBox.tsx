'use client';

import { Box, FlexProps, Flex, SystemStyleObject, Textarea, IconButton, Icon } from '@/chakra-ui/react';
import { ChangeEvent } from 'react';
import { IoSend } from 'react-icons/io5';

export interface ChatTextBoxProps extends FlexProps {}

export const ChatTextBox = (props: ChatTextBoxProps) => {
  const sty: SystemStyleObject = {
    gridArea: '1 / 1',
  };

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const box = evt.target.parentElement;

    if (!box) return;

    box.dataset.value = evt.target.value;
  };

  return (
    <Flex
      px={3}
      py={2}
      width="full"
      overflow="auto"
      borderRadius="xl"
      position="relative"
      borderWidth={1}
      borderStyle="solid"
      borderColor="gray.500"
      boxSizing="border-box"
      {...props}
    >
      <Box
        width="full"
        maxHeight={`${24 * 9}px`}
        display="inline-grid"
        position="relative"
        alignItems="center"
        _after={{
          ...sty,
          py: 1,
          boxSizing: 'border-box',
          content: 'attr(data-value) " "',
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
          fontSize: 'var(--chakra-fontSizes-md)',
        }}
      >
        <Textarea
          size="xs"
          px={0}
          py={1}
          my="auto"
          rows={1}
          border={0}
          color="gray.100"
          width="full"
          height="full"
          resize="none"
          fontSize="md"
          overflow="auto"
          gridArea={sty.gridArea!.toString()}
          onChange={handleChange}
          focusBorderColor="transparent"
          placeholder="Send a message"
          _placeholder={{ color: 'gray.500' }}
        />
      </Box>

      <Box alignSelf="flex-end" ms={3}>
        <IconButton aria-label="Send" borderRadius="xl" size="sm">
          <Icon as={IoSend} />
        </IconButton>
      </Box>
    </Flex>
  );
};
