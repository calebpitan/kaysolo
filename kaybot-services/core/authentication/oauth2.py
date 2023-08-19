from fastapi.security import OAuth2PasswordBearer

AUTHENTICATION_TOKEN_URL = "/accounts/authenticate"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=AUTHENTICATION_TOKEN_URL)
