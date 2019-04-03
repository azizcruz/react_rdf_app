from bootstrap_datepicker_plus import TimePickerInput
from django import forms
from .models import Todo, Task
class AddTodoForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ('title',)

class AddTaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('task', 'what_time')