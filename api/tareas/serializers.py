from rest_framework import serializers
from .models import Tareas

class TareasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tareas
        fields=('__all__')