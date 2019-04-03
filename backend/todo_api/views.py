from django.shortcuts import render
from rest_framework.views import APIView
from todo.models import Todo, Task
from rest_framework.response import Response
from .serializers import TodoSerializer, TaskSerializer
from rest_framework import status

# Create your views here.

class TodoList(APIView):
    ''' Retrieve Todos List '''

    # Get list of todos.
    def get(self, request):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Add a todo.
    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoDetail(APIView):
    ''' Delete todo '''

    # Query todo object.
    def get_object(self, pk):
        try:
            return Todo.objects.get(id=pk)
        except Todo.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id, format=None):
        todo = self.get_object(id)
        todo_title = todo.title
        todo.delete()
        return Response({'message': f'{todo_title} was deleted!'}, status=status.HTTP_204_NO_CONTENT)



class TaskList(APIView):
    ''' Retrieve Tasks List '''
    # Get list of tasks.
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Add a task.
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDetail(APIView):

    # Get object.
    def get_object(self, pk):
        try:
            return Task.objects.get(id=pk)
        except Task.DoesNotExist:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    # Get a single task.
    def get(self, request, id):
            task = self.get_object(id)
            serializer = TaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        

    # Update task.
    def patch(self, request, id):
        task = self.get_object(id)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 1})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


    
        
