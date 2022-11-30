FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-slim

COPY ./app /app/app

RUN pip install --no-cache-dir \
    fastapi==0.63.0 \
    uvicorn==0.13.4 \
    spacy==3.1.3 \
    langid==1.1.6 \
    && python -m spacy download xx_ent_wiki_sm \
    && python -m spacy download en_core_web_sm \
    && python -m spacy download ru_core_news_sm \
    && python -m spacy download fr_core_news_sm \
    && python -m spacy download de_core_news_sm \
    && python -m spacy download es_core_news_sm \
    && python -m spacy download pt_core_news_sm \
    && python -m spacy download zh_core_web_sm