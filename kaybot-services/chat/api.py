import openai

from fastapi import HTTPException

from chat.router import router
from intelligence.basic import generate_prompt, generate_response, PersonalityBackground
from schemas.openai import ChatCompletionResponse
from schemas.chat import MessageSend



@router.post("/message")
async def chat(message: MessageSend) -> dict:
    """
    An endpoint to post messages and expect a response. The messages are reconstructed into a
    valuable prompt and sent over to OpenAI's API which most likely responds with a message.

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
        raise HTTPException(503)

    return {"response": response}
