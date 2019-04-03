from django.db import models
from django.utils import timezone
from django.urls import reverse
# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=120)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_on',)

    def __str__(self):
        return self.title

class Task(models.Model):
    task = models.CharField(max_length=255)
    todo = models.ForeignKey('Todo', related_name='tasks', on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)
    what_time = models.TimeField(default='00:00')

    def __str__(self):
        return self.task

    def get_absolute_url(self):
        return reverse('todo:make-done', kwargs={'pk': self.id})