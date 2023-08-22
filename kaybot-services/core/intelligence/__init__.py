import openai
from core.settings import settings

openai.api_key = settings.OPENAI_SECRET_KEY
