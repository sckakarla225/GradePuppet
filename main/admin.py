from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Assignment)
admin.site.register(Grade)