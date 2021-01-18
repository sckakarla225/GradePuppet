import re
import spacy
import nltk
from collections import Counter
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords, wordnet
from nltk.stem import PorterStemmer, WordNetLemmatizer
import numpy as np
from scipy.spatial.distance import cosine

# Assignment Name - Gentrification FRQ

rubric = """
Q1: Explain TWO Ways that gentrification may positively impact neighborhoods.

A1: Increasing property values or as properties are renovated they rise in value + Increasing tax base; as properties are renovated they are reappraised for higher property tax values + Stimulating new businesses and/or investment. New businesses are attracted to the area due to increased incomes of new residents and/or increased tourism + New employment either in construction (short term) or in the new businesses that open (longer term) + Changing cultural landscape as a result of restoration efforts, aesthetic improvement of older or decaying structures, neighborhood rehabilitation, or historical preservation of structures or neighborhoods + Improvement in business services and consumer, resident, or visitor amenities (e.g. young, diverse, “cool city” factor) + Improvement in public infrastructure, e.g., new sidewalks, repaved roads, community centers, parks, upgrading of utilities

Q2: Explain TWO Ways that gentrification may negatively impact neightborhoods.

A2: Displacement due to rising property values and rents; impacting less affluent, elderly, or marginalized groups + Changing cultural landscape as modern or contemporary buildings take the place of traditional or historic architecture + Increased social tension due to changes in neighborhood characteristics, diversity, and opportunities + Displacement may lead to increased homelessness + Decrease in the number of homes available for rent that could impact low-income residents + Changing businesses as small, locally-owned businesses are replaced with national or global chains, franchises or companies with prohibitively expensive goods and services + Shift in dwelling use from residential to commercial, or change in the type of available housing units, going from multifamily structures to single-family structures; or single-family structures to condominiums
"""

student_answer_1 = """
One way that gentrifcation may positively impact neighborhoods is by improving the infrastructure and buildings in the neighborhood. When a neighborhood is undergoing gentrification, people of middle to high income move into rundown, poorer neighborhoods and fix up the housing and other buildings in the area. Old, run down building will either be renovated or replaced with new ones. This makes the neighborhood's overall apperance and infrastructure better. Another way gentrification may postively impact neighborhoods is by boosting the local economy. Better housing and buildings attract businesses. This leads to the commercialization of the area and will generate a lot of income for the local economy. New businesses will open up, older ones will be revitalized and a lot of money will be generated as people start to buy things more and more.
"""

student_answer_2 = """
One way that gentrification may negatively impact neighborhoods is by forcing out the original tenents. Before gentrification occurs the neighborhood is mostly composed of people of lower income. After gentrification, property rates will increase along with housing rates. Now the original tenents with a lower income will no longer be able to afford to live there and will have to move out. Another way gentrification may negatively impact neighborhoods is by loss of historical aspects and buildings. In the process of renovating the neighborhood, older building with historical importance may be torn down to be replaced with newer buildings. This may lead to placelessness since the neighborhood is losing part of its uniqueness and identity.
"""

def format_rubric(rubric):
    rubric_dict = {}
    rubric.replace(" ", "")

    for i in range(1, 3):
        if f'Q{i}' in rubric:
            start_q_index = rubric.find(f'Q{i}')
            end_q_index = start_q_index + 2
            start_a_index = rubric.find(f'A{i}')
            end_a_index = start_a_index + 2
            start_next_q_index = rubric.find(f'Q{i + 1}')
            question = rubric[end_q_index + 1:start_a_index]
            answer = rubric[end_a_index + 1:start_next_q_index]
            rubric_dict[f"Q{i}"] = question
            rubric_dict[f"A{i}"] = answer
    
    return rubric_dict


def get_questions(rubric_dict):
    questions_dict = {}

    for key, value in rubric_dict.items():
        if key.startswith("Q"):
            questions_dict[key] = value

    return questions_dict


def generate_answers(rubric_dict):
    answers = []

    for i in range(1, 3):
        current_answers = []
        text_answers = rubric_dict[f'A{i}']
        text_answers.split('+')
        current_answers.append(text_answers)
        answers.append(current_answers)

    return answers 

def get_part_of_speech(word):
    probable_part_of_speech = wordnet.synsets(word)
    pos_counts = Counter()
    pos_counts["n"] = len(  [ item for item in probable_part_of_speech if item.pos()=="n"]  )
    pos_counts["v"] = len(  [ item for item in probable_part_of_speech if item.pos()=="v"]  )
    pos_counts["a"] = len(  [ item for item in probable_part_of_speech if item.pos()=="a"]  )
    pos_counts["r"] = len(  [ item for item in probable_part_of_speech if item.pos()=="r"]  )
    
    most_likely_part_of_speech = pos_counts.most_common(1)[0][0]
    return most_likely_part_of_speech


def get_grade(studentresponseg, rubricg):
    rubric = []

    cleaned = re.sub('\W+', ' ', studentresponseg)
    tokenized = word_tokenize(cleaned)

    lemmatizer = WordNetLemmatizer()
    studentresponseg = [lemmatizer.lemmatize(token, get_part_of_speech(token)) for token in tokenized]

    for i in range(0, len(rubricg)- 1):
        cleaned = re.sub('\W+', ' ', rubricg[i])
        tokenized = word_tokenize(cleaned)
        rubric.append( [lemmatizer.lemmatize(token, get_part_of_speech(token)) for token in tokenized])

    stop_words = set(stopwords.words('english'))
    studentresponse = []
    for i in range(0, len(studentresponseg) - 1):
        if studentresponseg[i] not in stop_words:
            studentresponse.append(studentresponseg[i])

    rubricx = []
    for i in range(0, len(rubric) - 1):
        temparr = []
        for j in range(0, len(rubric[i])):
            if rubric[i][j] not in stop_words:
                temparr.append(rubric[i][j])
            rubricx.append(temparr)

    rubric = rubricx
    nlp = spacy.load('en')

    returngrade = 0
    for n in rubric:
        f = 0
        z = []
        for j in n: 
            z2 = []
            for q in studentresponse:
                z2.append(cosine(nlp(q).vector, nlp(j).vector))
            z.append(z2)
        for n2 in z:
            for n3 in n2:
                if n3 < .2: 
                    f += 1
                elif n3 < .3:
                    f += 0
                else: 
                    f -= .03
            if f > .9:
                returngrade = 1
  
    return returngrade

def run():
    rubric_dict = format_rubric(rubric)
    answers = generate_answers(rubric_dict)
    print(answers)

run()





