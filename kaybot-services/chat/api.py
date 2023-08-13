from chat.router import router

from schemas.chat import MessageSend


@router.post("/message")
async def chat(message: MessageSend) -> dict:
    return {"response": message.message_body}
