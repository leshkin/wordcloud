import de_core_news_sm
import en_core_web_sm
import es_core_news_sm
import fr_core_news_sm
import langid
import pt_core_news_sm
import ru_core_news_sm
import xx_ent_wiki_sm
import zh_core_web_sm

nlp_xx = xx_ent_wiki_sm.load()
nlp_en = en_core_web_sm.load()
nlp_ru = ru_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_fr = fr_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_de = de_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_es = es_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_pt = pt_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_zh = zh_core_web_sm.load(disable=["ner"])


def get_lemmas(text):
    lang = langid.classify(text)[0]
    if lang == "en":
        doc = nlp_en(text)
    elif lang == "ru":
        doc = nlp_ru(text)
    elif lang == "fr":
        doc = nlp_fr(text)
    elif lang == "de":
        doc = nlp_de(text)
    elif lang == "es":
        doc = nlp_es(text)
    elif lang == "pt":
        doc = nlp_pt(text)
    elif lang == "zh":
        doc = nlp_zh(text)
    else:
        doc = nlp_en(text) # todo: nlp_xx model doesn't work for tr, uk and hi languages

    lemmas = []
    for token in doc:
        if (
            token.is_stop is False
            and token.lemma_ != "-"
            and (
                token.pos_ == "NOUN"
                or token.pos_ == "VERB"
                or token.pos_ == "ADJ"
                or token.pos_ == "NUM"
                or token.pos_ == "ADP"
                or token.pos_ == "PRON"
                or token.pos_ == "PROPN"
            )
        ):
            if lang == "zh":
                lemmas.append(token.text)
            else:
                lemmas.append(capitalize_by_shape(token))
    
    # We can get "Amour" and "amour" after SpaCy lemmatization.
    # Change them to "amour" and "amour" to get correct stats.
    lemmas_corrected = []
    for lemma in lemmas:
        lemma_lower = lemma.lower()
        if lemma_lower in lemmas:
            lemmas_corrected.append(lemma_lower)
        else:
            lemmas_corrected.append(lemma)
    return {'lang': lang, 'words': frequency_bag_from_list(lemmas_corrected)}


def capitalize_by_shape(token):
    if token.shape_.startswith("XX") or token.shape_.startswith("X.X."):
        return token.lemma_.upper()
    elif token.pos_ == "PROPN":
        return token.lemma_.capitalize()
    else:
        return token.lemma_


def frequency_bag_from_list(word_list):
    frequency_bag = []
    unique_lemmas = list(set(word_list))
    for i in unique_lemmas:
        frequency_bag.append({"name": i, "count": word_list.count(i)})
    sorted_frequency_bag = sorted(frequency_bag, key=lambda x: x["count"], reverse=True)
    return sorted_frequency_bag
