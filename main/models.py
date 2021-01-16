from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# CREATE MODELS HERE

class Teacher(models.Model):
    name = models.CharField(max_length=255, blank=False, null=True)
    course = models.CharField(max_length=255, blank=False, null=True)
    grade_level = models.PositiveIntegerField(validators=[MinValueValidator(6), MaxValueValidator(12)])

class Grade(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    content = models.TextField(blank=False, null=True)
    grade = models.DecimalField(validators=[MinValueValidator(0.0), MaxValueValidator(100.00)])

class Assignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=False, null=True)
    # Rubric Field

class Student(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=False, null=True)
    

 

