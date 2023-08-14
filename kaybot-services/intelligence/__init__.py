import openai
from core.settings import kaybot_settings

openai.api_key = kaybot_settings.OPENAI_SECRET_KEY
