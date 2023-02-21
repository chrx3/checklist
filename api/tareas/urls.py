from django.urls import path
from tareas import views

urlpatterns=[
    path('tareas',views.tareasApi),
    path('tareas/<id>', views.tareasApi)
]