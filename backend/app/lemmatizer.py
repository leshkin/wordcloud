import langid
import en_core_web_sm
import ru_core_news_sm
import fr_core_news_sm
import de_core_news_sm
import es_core_news_sm
import pt_core_news_sm
import zh_core_web_sm

nlp_en = en_core_web_sm.load()
nlp_ru = ru_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_fr = fr_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_de = de_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_es = es_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_pt = pt_core_news_sm.load(disable=["tagger", "parser", "ner", "textcat"])
nlp_zh = zh_core_web_sm.load(disable=["ner"])

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
    elif lang == "pt":
        doc = nlp_pt(text)
    elif lang == "zh":
        doc = nlp_zh(text)
    else:
        doc = nlp_en(text)

    for token in doc:
        print(token.text, token.lemma_, token.pos_, token.shape_, token.is_stop)
    print(lang)
    lemmas = []
    for token in doc:
        if (token.is_stop == False and token.lemma_ != "-" and
               (token.pos_ == "NOUN" or token.pos_ == "VERB" or token.pos_ == "ADJ" or token.pos_ == "NUM"
                or token.pos_ == "ADP" or token.pos_ == "PRON" or token.pos_ == "PROPN")
           ):
            if lang == "zh":
                lemmas.append(token.text)
            else:
                lemmas.append(capitalize_by_shape(token)) 

    return frequency_bag_from_list(lemmas)

def capitalize_by_shape(token):
    if token.shape_.startswith("XX") or token.shape_.startswith("X.X."):
        return token.lemma_.upper()
    elif token.pos_ == "PROPN":
        return token.lemma_.capitalize()
    else:
        return token.lemma_

def frequency_bag_from_list(word_list):
    frequency_bag = dict()
    unique_lemmas = sorted(list(set(word_list)))
    for i in unique_lemmas:
        frequency_bag[i] = word_list.count(i)
    sorted_fr_bag = sorted(frequency_bag.items(), key=lambda x: x[1], reverse=True)
    return sorted_fr_bag