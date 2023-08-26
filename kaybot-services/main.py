import uvicorn

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from core.exceptions.http import AppHTTPException, ErrorCode
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
    allow_origins=settings.CLIENT_HOSTS,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_credentials=True,
    allow_headers=["*"],
)


app.include_router(account_router, prefix="/accounts", tags=["Account"])
app.include_router(chat_router, prefix="/chats", tags=["Chat"])
app.include_router(user_router, prefix="/users", tags=["User"])


@app.exception_handler(AppHTTPException)
def app_http_exception_handler(request: Request, exc: AppHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message, "success": False, "info": {"code": exc.code}},
    )


@app.exception_handler(RequestValidationError)
def request_validation_exception_handler(request: Request, exc: RequestValidationError):
    content = {
        "message": "The input could not be processed as it is invalid",
        "success": False,
        "info": {
            "code": ErrorCode.UNPROCESSABLE_ENTITY,
            "errors": [
                {
                    "type": error["type"],
                    "context": error["ctx"],
                    "path": error["loc"],
                    "message": error["msg"],
                    "value": error["input"],
                }
                for error in exc.errors()
            ],
        },
    }

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=content,
    )


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
