from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .models import Tareas
from .serializers import TareasSerializer
from datetime import datetime
from django.utils import timezone


# Create your views here.

@csrf_exempt
def tareasApi(request, id=0):
    if request.method=='GET':
        tareas = Tareas.objects.all()
        tareas_serializer=TareasSerializer(tareas,many=True)
        return JsonResponse(tareas_serializer.data, safe=False)
    elif request.method=='POST':
        tareas_data= JSONParser().parse(request)
        tareas_serializer=TareasSerializer(data=tareas_data)
        if tareas_serializer.is_valid():
            tareas_serializer.save()
            return JsonResponse("Tarea agregada",safe=False)
        return JsonResponse("Fallo", safe=False)
    elif request.method=='PUT':
        tareas_data=JSONParser().parse(request)
        tareas = Tareas.objects.get(TareaId=tareas_data['TareaId'])
        tareas_serializer = TareasSerializer(tareas,data=tareas_data)
        if tareas_serializer.is_valid():
            tareas_serializer.save()
            return JsonResponse("Tarea actualizada",safe=False)
        return JsonResponse('Fallo la actualizacion')
    elif request.method=='DELETE':
        tareas=Tareas.objects.get(TareaId=id)
        tareas.delete()
        return JsonResponse("Tarea eliminada",safe=False)
