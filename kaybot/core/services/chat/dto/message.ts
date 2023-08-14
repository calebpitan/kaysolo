import { MessageSend } from '@/client';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class ChatMessage implements MessageSend {
  @IsNotEmpty({ message: 'message body cannot be empty' })
  @Expose()
  message_body: string;
}
