# Generated by Django 3.0.3 on 2020-11-09 05:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0009_remove_twittertopworst_top_tweet'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='twittertopworst',
            name='user_twitter_id',
        ),
    ]
