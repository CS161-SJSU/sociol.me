# Generated by Django 3.0.3 on 2020-11-09 05:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0008_auto_20201109_0516'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='twittertopworst',
            name='top_tweet',
        ),
    ]
