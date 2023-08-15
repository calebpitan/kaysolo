import openai

from enum import Enum

from intelligence.personality import ADVANCED_BACKGROUND, PERSONALITY, SIMPLE_BACKGROUND
from core.schemas.openai import ChatCompletionResponse


class PersonalityBackground(Enum):
    """A simple enum used to award background information to a personality
    given to a GPT to assume.

    `SIMPLE` consumes relatively less tokens

    `ADVANCED` expends relatively more tokens

    """

    SIMPLE = 0
    ADVANCED = 1


class Prompt(dict):
    system: str
    user: str


def generate_prompt(
    question: str, background_type: PersonalityBackground = PersonalityBackground.SIMPLE
) -> Prompt:
    """Generate a prompt from a give question or message,
    a background information for the personality which is predefined
    and set by an enum of `PersonalityBackground`

    """
    is_simple = background_type is PersonalityBackground.SIMPLE
    background = SIMPLE_BACKGROUND if is_simple else ADVANCED_BACKGROUND

    system = f"{background}\n\n{PERSONALITY}"

    return {"system": system, "user": question}


def generate_response(
    prompt: Prompt, max_tokens=100, temperature=0.5
) -> ChatCompletionResponse:
    """Generate a response to an given prompt.
    The prompt is programmed such that the GPT is given a
    personality of its own.
    The prompt that awards this personality to the GPT is in fact
    itself a message with a "system" role while a user and/or assistant
    message follows it.

    """
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        temperature=temperature,
        max_tokens=max_tokens,
        messages=[
            {"role": "system", "content": prompt.get("system")},
            {"role": "user", "content": prompt.get("user")},
        ],
    )

    return response
