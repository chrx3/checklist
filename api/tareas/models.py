from django.db import models
import datetime
from django.utils import timezone
# Create your models here.
class Tareas(models.Model):
    TareaId = models.AutoField(primary_key=True)
    TareaNombre = models.CharField(max_length=100)
    CreacionTarea = models.DateTimeField(default=timezone.now, 
                            verbose_name='Fecha de creación', 
                            help_text='Formato: AAAA-MM-DD HH:MM')
    ActualizacionTarea = models.DateTimeField(auto_now=True)
    opciones = (('Por hacer', 'Por hacer'), ('En proceso', 'En proceso'), 
                ('Realizada', 'Realizada'), ('No Realizada', 'No Realizada'))
    Status = models.CharField(max_length=50, choices=opciones, default='Por hacer')
