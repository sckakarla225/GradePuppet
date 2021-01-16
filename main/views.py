from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import * 

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
    # name = teacher["name"]
    # teacher_obj = Teacher.objects.get(name=name)

    # if teacher_obj.DoesNotExist:
    #     serializer = CreateTeacherSerializer(data=teacher)

    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(data={
    #             "success": "Teacher was created"
    #         })
    #     else:
    #         return Response(data={
    #             "failure": "Teacher not created"
    #         })
    # else:
    #     return Response(data={
    #         "No": "Teacher already exists"
    #     })
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
    teacher = Teacher.objects.get(id=teacher_id)
    students = Student.objects.filter(teacher=teacher)
    serializer = StudentSerializer(students, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def createStudent(request):
    student = request.data
    name = student["name"]
    student_obj = Student.objects.get(name=name)

    if student_obj.DoesNotExist:
        serializer = StudentSerializer(data=student)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data={
                "success": "Student created"
            })
        else:
            return Response(serializer.data)
    else:
        return Response(data={
            "No": "Student already exists"
        })


@api_view(['GET'])
def getStudentGrades(request, student_id):
    grades = Grade.objects.filter(student=student_id)
    serializer = GetGradesSerializer(grades, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def addGrade(request):
    grade = request.data
    student = Student.objects.get(name=request.data["name"])
    request.data["student"] = student.id
    
    # Implement AI Algorithm Here and Add "Grade" Field to Object

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



