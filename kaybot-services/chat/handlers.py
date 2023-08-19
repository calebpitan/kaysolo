import openai

from typing import Annotated

from fastapi import Depends, HTTPException, status

from core.deps import get_current_account
from core.models.account import Account
from core.schemas.chat import MessageCreate
from core.schemas.openai import ChatCompletionResponse
from core.utils import create_error
from intelligence.basic import generate_prompt, generate_response, PersonalityBackground

from .router import router


@router.post("/message", response_model=ChatCompletionResponse)
def create_message(
    message: MessageCreate,
    current_account: Annotated[Account, Depends(get_current_account)],
) -> dict:
    """
    An endpoint to post messages and expect a response. The messages are reconstructed into a
    valuable prompt and sent over to OpenAI's API which most likely responds with a message.

    :param message: The message object containing the message body to send

    :raises HTTPException:
        503 -> when it fails to establish a successful communication with third party API

    """
    prompt = generate_prompt(
        question=message.message_body,
        background_type=PersonalityBackground.SIMPLE,
    )

    try:
        response = generate_response(prompt=prompt)
    except openai.OpenAIError as error:
        # TODO: Add logger and log error
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            create_error(message="Failed to establish outbound communication"),
        )

    return {"response": response}
