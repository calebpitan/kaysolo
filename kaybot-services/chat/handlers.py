import openai

from fastapi import HTTPException

from chat.router import router
from core.schemas.chat import MessageCreate
from core.schemas.openai import ChatCompletionResponse
from core.utils import create_error
from intelligence.basic import generate_prompt, generate_response, PersonalityBackground


@router.post("/message", response_model=ChatCompletionResponse)
def create_message(message: MessageCreate) -> dict:
    """
    An endpoint to post messages and expect a response. The messages are reconstructed into a
    valuable prompt and sent over to OpenAI's API which most likely responds with a message.

    :param message: The message object containing the message body to send

    Raises:
        HTTPException

    """
    prompt = generate_prompt(
        question=message.message_body, background_type=PersonalityBackground.SIMPLE
    )

    try:
        response = generate_response(prompt=prompt)
    except openai.OpenAIError as error:
        print(error)
        raise HTTPException(
            503, create_error(message="Failed to establish outbound communication")
        )

    return {"response": response}
