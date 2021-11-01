FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-slim

COPY ./app /app/app

RUN pip install --no-cache-dir \
    fastapi==0.63.0 \
    uvicorn==0.13.4 \
    spacy==3.1.3 \
    langid==1.1.6 \
    && python -m spacy download en_core_web_sm \
    && python -m spacy download ru_core_news_sm