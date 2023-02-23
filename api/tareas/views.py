from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .models import Tareas
from .serializers import TareasSerializer
from datetime import datetime
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.

@api_view(["GET","POST","PUT","DELETE"])
def tareasApi(request, id=0):
    if request.method=='GET':
        tareas = Tareas.objects.all().order_by("TareaId","CreacionTarea")
        tareas_serializer=TareasSerializer(tareas,many=True)
        return Response(tareas_serializer.data)
    elif request.method=='POST':
        tareas_data= JSONParser().parse(request)
        tareas_serializer=TareasSerializer(data=tareas_data)
        if tareas_serializer.is_valid():
            tareas_serializer.save()
            return JsonResponse("Tarea agregada",safe=False)
        return Response("Fallo")
    elif request.method=='PUT':
        tareas_data=JSONParser().parse(request)
        tareas = Tareas.objects.get(TareaId=tareas_data['TareaId'])
        tareas_serializer = TareasSerializer(tareas,data=tareas_data)
        if tareas_serializer.is_valid():
            tareas_serializer.save()
            return Response("Tarea actualizada")
        else:
            print(tareas_serializer.errors)
        return Response('Fallo la actualizacion')
    elif request.method=='DELETE':
        tareas=Tareas.objects.get(TareaId=id)
        tareas.delete()
        return Response("Tarea eliminada")

@api_view(["GET"])
def getId(request):
    id = request.GET.get('id_tarea')
    tareas = Tareas.objects.filter(TareaId = id).values()
    return Response(tareas)