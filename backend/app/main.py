import logging
from logging.handlers import TimedRotatingFileHandler

import app.lemmatizer as lemmatizer
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# prepare logger
formatter = logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s")
handler = TimedRotatingFileHandler("logs/wordcloud.log", when="D", interval=10)
handler.setFormatter(formatter)
logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(handler)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://wordcloud.localhost",
    "https://wordcloud.online",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Request(BaseModel):
    text: str


@app.post("/lemmatize")
def analyze(req: Request):
    logger.info(req.text)
    if len(req.text) < 10000:
        return lemmatizer.get_lemmas(req.text)
    else:
        return {"error": "textTooLong"}
