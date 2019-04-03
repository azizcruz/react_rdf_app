from django.contrib import admin
from .models import Todo, Task
# Register your models here.

class TaskAdmin(admin.ModelAdmin):
    list_display = ('task', 'is_done', 'todo')

admin.site.register(Todo)
admin.site.register(Task, TaskAdmin)