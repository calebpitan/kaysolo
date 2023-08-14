from enum import Enum
from pydantic import BaseModel


class ChatCompletionRoleEnum(Enum):
    system = "system"
    assistant = "assistant"
    user = "user"


class ChatCompletionObjectEnum(Enum):
    chat_completion = "chat.completion"


class ChatCompletionChoiceMessage(BaseModel):
    role: ChatCompletionRoleEnum
    content: str


class ChatCompletionChoice(BaseModel):
    index: int
    message: ChatCompletionChoiceMessage
    finish_reason: str


class ChatCompletionUsage(BaseModel):
    prompt_tokens: int
    completion_tokens: int
    total_token: int


class ChatCompletionResponseBody(BaseModel):
    id: str
    object: ChatCompletionObjectEnum
    created: int
    model: str
    choices: list[ChatCompletionChoice]
    usage: ChatCompletionUsage


class ChatCompletionResponse(BaseModel):
    response: ChatCompletionResponseBody
