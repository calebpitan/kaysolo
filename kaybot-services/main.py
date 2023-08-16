import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.schemas.base import ApplicationInfo
from core.settings import kaybot_settings

# import routers and handlers
from account.handlers import router as account_router
from chat.handlers import router as chat_router

app = FastAPI(
    title=kaybot_settings.APP_NAME,
    description=kaybot_settings.DESCRIPTION,
    version=kaybot_settings.VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=kaybot_settings.CLIENT_ADDRESSES,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_credentials=True,
)


app.include_router(account_router, prefix="/account", tags=["Account"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])


@app.get("/", tags=["Root"], response_model=ApplicationInfo)
async def root():
    """Returns basic information about the application"""

    return ApplicationInfo(
        title=app.title,
        version=app.version,
        description=app.description,
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=kaybot_settings.PORT, reload=True)
