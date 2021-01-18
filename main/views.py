from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import * 

import re
import spacy
import nltk
from collections import Counter
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.corpus import stopwords, wordnet
from nltk.stem import PorterStemmer, WordNetLemmatizer
import numpy as np
from scipy.spatial.distance import cosine


# NLP MODEL FUNCTIONS

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

rubricg = """
Q1: Explain TWO Ways that gentrification may positively impact neighborhoods.

A1: Increasing property values or as properties are renovated they rise in value + 
        Increasing tax base; as properties are renovated they are reappraised for higher property tax values + 
        Stimulating new businesses and/or investment. New businesses are attracted to the area due to increased
        incomes of new residents and/or increased tourism +
        New employment either in construction (short term) or in the new businesses that open (longer term) +
        Changing cultural landscape as a result of restoration efforts, aesthetic improvement of older or decaying
        structures, neighborhood rehabilitation, or historical preservation of structures or neighborhoods +
        Improvement in business services and consumer, resident, or visitor amenities (e.g. young, diverse,
        “cool city” factor) +
        Improvement in public infrastructure, e.g., new sidewalks, repaved roads, community centers, parks,
        upgrading of utilities
"""

rubricg2 = """
Q2: Explain TWO Ways that gentrification may negatively impact neightborhoods.

A2: Displacement due to rising property values and rents; impacting less affluent, elderly, or marginalized groups +
        Changing cultural landscape as modern or contemporary buildings take the place of traditional or historic
        architecture +
        Increased social tension due to changes in neighborhood characteristics, diversity, and opportunities +
        Displacement may lead to increased homelessness +
        Decrease in the number of homes available for rent that could impact low-income residents +
        Changing businesses as small, locally-owned businesses are replaced with national or global chains,
        franchises or companies with prohibitively expensive goods and services +
        Shift in dwelling use from residential to commercial, or change in the type of available housing units, going from multifamily structures to single-family structures; or single-family structures to condominiums
"""

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
    nlp = spacy.load('en_core_web_sm')

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

# CREATE VIEWS HERE

@api_view(['GET'])
def apiOverview(request):

    return Response(data={
        "Create New Teacher": "create_teacher/", 
        "Get My Info": "my_info/<int:teacher_id>/", 
        "Get My Students": "my_students/<int:teacher_id>/", 
        "Create New Student": "create_student/",
        "Get Student Grades": "student_grades/<int:student_id>/",  
        "Add Grade": "add_grade/", 
        "Get My Grades": "my_grades/<int:teacher_id>/", 
        "Create Assignment": "create_assignment/", 
        "Get My Assignments": "my_assignments/<int:teacher_id>/", 
    })


@api_view(['POST'])
def createTeacher(request):
    teacher = request.data 
    serializer = CreateTeacherSerializer(data=teacher)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(data={
            "failure": "Teacher not created"
        })



@api_view(['GET'])
def getTeacherInfo(request, teacher_id):
    teacher = Teacher.objects.get(id=teacher_id)
    serializer = TeacherSerializer(teacher)

    return Response(serializer.data)


@api_view(['GET'])
def getAllStudents(request, teacher_id):
    students = Student.objects.filter(teacher=teacher_id)
    serializer = StudentSerializer(students, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def createStudent(request):
    student = request.data
    serializer = StudentSerializer(data=student)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(data={
            "success": "Student created"
        })
    else:
        return Response(serializer.data)


@api_view(['GET'])
def getStudentGrades(request, student_id):
    grades = Grade.objects.filter(student=student_id)
    serializer = GetGradesSerializer(grades, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def addGrade(request):
    grade = request.data
    student = Student.objects.get(name=request.data["name"])
    grade["student"] = student.id
    content = request.data["content"]
    assignment = Assignment.objects.get(id=assignment)

    student_answer_1 = ""
    student_answer_2 = ""
    content.replace(" ", "")
    
    s1_start_index = content.find('1.')
    s1_end_index = s1_start_index + 2
    s2_start_index = content.find('2.')
    s2_end_index = s2_start_index + 2
    student_answer_1 = content[s1_end_index + 1:s2_start_index]
    student_answer_2 = content[s2_end_index + 1:]

    grade_1 = get_grade(student_answer_1, rubricg)
    grade_2 = get_grade(student_answer_2, rubricg2)

    average = (grade_1 + grade_2) / 2
    final_grade = 0

    if average == 1:
        final_grade = 100
    elif average >= 0.5:
        final_grade = 89
    elif average >= 0:
        final_grade = 79
    else:
        final_grade = 0

    grade["grade"] = final_grade

    serializer = AddGradeSerializer(data=grade)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(data={
            "failure": "Graded not added"
        })


@api_view(['GET'])
def getMyGrades(request, teacher_id):
    teacher = Teacher.objects.get(id=teacher_id)
    grades = Grade.objects.filter(teacher=teacher)
    serializer = GetGradesSerializer(grades, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def createAssignment(request):
    assignment = request.data 
    serializer = AssignmentSerializer(data=assignment)

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(data={
            "failure": "Assignment not created"
        })


@api_view(['GET'])
def getAllAssignments(request, teacher_id):
    teacher = Teacher.objects.get(id=teacher_id)
    assignments = Assignment.objects.filter(teacher=teacher)
    serializer = AssignmentSerializer(assignments, many=True)

    return Response(serializer.data)



