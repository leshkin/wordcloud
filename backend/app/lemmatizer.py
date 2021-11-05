import spacy
import langid

nlp_en = spacy.load("en_core_web_sm")
nlp_ru = spacy.load("ru_core_news_sm")
nlp_fr = spacy.load("fr_core_news_sm")
nlp_de = spacy.load("de_core_news_sm")
nlp_es = spacy.load("es_core_news_sm")

def get_lemmas(text):
    lang = langid.classify(text)[0]
    if lang == "ru":
        doc = nlp_ru(text)
    elif lang == "fr":
        doc = nlp_fr(text)
    elif lang == "de":
        doc = nlp_de(text)
    elif lang == "es":
        doc = nlp_es(text)
    else:
        doc = nlp_en(text)
    lemmas =  [
        token.lemma_ for token in doc
            if token.is_stop == False and
               token.pos_ != "PUNCT" and
               token.pos_ != "ADP" and
               token.pos_ != "NUM" and
               token.pos_ != "SYM" and
               token.pos_ != "AUX"
    ]
    return frequency_bag_from_list(lemmas)

def frequency_bag_from_list(word_list):
    frequency_bag = dict()
    unique_lemmas = sorted(list(set(word_list)))
    for i in unique_lemmas:
        frequency_bag[i] = word_list.count(i)
    sorted_fr_bag = sorted(frequency_bag.items(), key=lambda x: x[1], reverse=True)
    return sorted_fr_bag