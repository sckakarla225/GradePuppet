from rest_framework import serializers
from .models import * 

# CREATE SERIALIZERS HERE

class CreateTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'name', 'grade_level', 'course')

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id', 'name', 'grade_level', 'course')

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'name')

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'teacher')

class GetGradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('id', 'teacher', 'student', 'content', 'grade', 'assignment')

class AddGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('id', 'teacher', 'student', 'content')