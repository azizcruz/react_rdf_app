from django.urls import path
from . import views

app_name = 'todo'

urlpatterns = [
    path('', views.ListTodos.as_view(), name='list-todos'),
    path('todo/add/', views.AddTodoView.as_view(), name='add-todo'),
    path('task/add/', views.AddTaskView.as_view(), name='add-task'),
    path('task/done/<int:pk>', views.TaskIsDone.as_view(), name='make-done')
]