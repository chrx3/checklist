# Generated by Django 4.1.1 on 2023-02-24 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tareas', '0006_alter_tareas_actualizaciontarea_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tareas',
            name='ActualizacionTarea',
            field=models.DateTimeField(auto_now=True),
        ),
    ]