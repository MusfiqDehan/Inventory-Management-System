# Generated by Django 5.0.6 on 2024-12-06 21:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_app', '0003_user_store'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='store',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='inventory_app.store'),
        ),
    ]
