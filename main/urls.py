from django.urls import path
from . import views 

urlpatterns = [
    path('create_teacher/', views.createTeacher, name="Create Teacher"), 
    path('my_students/<int:teacher_id>/', views.getAllStudents, name="Get My Students"), 
    path('my_info/<int:teacher_id>/', views.getTeacherInfo, name="Get My Info"), 
    path('my_students/<int:teacher_id>/', views.getAllStudents, name="Get My Students"), 
    path('create_student/', views.createStudent, name="Create Student"), 
    path('add_grade/', views.addGrade, name="Add Grade"), 
    path('my_grades/<int:teacher_id>/', views.getMyGrades, name="Get My Grades"), 
    path('create_assignment/', views.createAssignment, name="Create Assignment"), 
    path('my_assignments/<int:teacher_id>/', views.getAllAssignments, name="Get My Assignments"), 
]