from chat.router import router

from intelligence.basic import generate_prompt, generate_response, PersonalityBackground
from schemas.chat import MessageSend


@router.post("/message")
async def chat(message: MessageSend) -> dict:
    prompt = generate_prompt(
        question=message.message_body, background_type=PersonalityBackground.SIMPLE
    )

    response = generate_response(prompt=prompt)

    return {"response": response}
