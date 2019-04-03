from django.shortcuts import render, redirect
from django.views import generic
from .models import Todo, Task
from .forms import AddTodoForm, AddTaskForm
from django.urls import reverse_lazy

# Create your views here.

class ListTodos(generic.ListView):
    queryset = Todo.objects.prefetch_related('tasks').all()
    template_name = 'todo/list_todos.html'
    context_object_name = 'todos'
    extra_context = {
        'form': AddTaskForm()
    }

class AddTodoView(generic.CreateView):
    form_class = AddTodoForm
    template_name = 'todo/forms/add_task.html'
    success_url = reverse_lazy('todo:list-todos')

class AddTaskView(generic.CreateView):
    form_class = AddTaskForm
    success_url = reverse_lazy('todo:list-todos')

    def form_valid(self, form):
        """If the form is valid, save the associated model."""
        form.instance.todo = Todo.objects.get(id=form.data['todo'])
        self.object = form.save()
        return super().form_valid(form)


class TaskIsDone(generic.View):
    def get(self, request, *args, **kwargs):
        
        task = Task.objects.get(id=kwargs.get('pk'))
        task.is_done = not task.is_done
        task.save()
        # import pdb; pdb.set_trace()
        return redirect('todo:list-todos')


        

    
