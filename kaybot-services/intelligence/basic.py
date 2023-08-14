import openai

from enum import Enum

from intelligence.personality import advanced_background, personality, simple_background
from schemas.openai import ChatCompletionResponse


class PersonalityBackground(Enum):
    SIMPLE = 0
    ADVANCED = 1


class Prompt(dict):
    system: str
    user: str


def generate_prompt(
    question: str, background_type: PersonalityBackground = PersonalityBackground.SIMPLE
) -> Prompt:
    is_simple = background_type == PersonalityBackground.SIMPLE
    background = simple_background if is_simple else advanced_background

    system = f"{background}\n\n{personality}"

    return {"system": system, "user": question}


def generate_response(prompt: Prompt) -> ChatCompletionResponse:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=0.5,
        messages=[
            {"role": "system", "content": prompt.get("system")},
            {"role": "user", "content": prompt.get("user")},
        ],
    )

    return response
