# Generated by Django 4.1.5 on 2023-02-21 14:22

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tareas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tareas',
            name='CreacionTarea',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
