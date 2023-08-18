import uvicorn

from fastapi import FastAPI, Request
from fastapi.exceptions import ResponseValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from core.schemas.base import ApplicationInfo
from core.settings import settings

# import routers and handlers
from account.handlers import router as account_router
from chat.handlers import router as chat_router
from user.handlers import router as user_router

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.DESCRIPTION,
    version=settings.VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CLIENT_ADDRESSES,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_credentials=True,
)


app.include_router(account_router, prefix="/account", tags=["Account"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])
app.include_router(user_router, prefix="/user", tags=["User"])


@app.get("/", tags=["Root"], response_model=ApplicationInfo)
async def root():
    """Returns basic information about the application"""

    return ApplicationInfo(
        title=app.title,
        version=app.version,
        description=app.description,
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=settings.PORT, reload=True)
