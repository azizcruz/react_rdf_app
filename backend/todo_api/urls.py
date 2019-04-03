from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoList, TaskList, TaskDetail, TodoDetail

app_name = 'todo_api'

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('todos/', TodoList.as_view(), name='todo-list'),
    path('todos/<int:id>/', TodoDetail.as_view(), name='todo-delete'),
    path('tasks/', TaskList.as_view(), name='tasks-list'),
    path('tasks/<int:id>/', TaskDetail.as_view(), name='task-detail')
]