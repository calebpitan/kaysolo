import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.settings import kaybot_settings

from chat.api import router as chat_router


app = FastAPI(
    title=kaybot_settings.APP_NAME,
    description=kaybot_settings.DESCRIPTION,
    version=kaybot_settings.VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_credentials=True,
)


app.include_router(chat_router, prefix="/chat", tags=["Chat"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "title": app.title,
        "description": app.description,
        "version": app.version,
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=kaybot_settings.PORT, reload=True)
