# Generated by Django 4.0.6 on 2022-07-29 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_agency_alter_user_phone_number_adviser_adminstor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]