# Generated by Django 3.0.3 on 2020-11-09 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0005_remove_twittertopworst_reply_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='twittertopworst',
            name='top_tweet',
        ),
        migrations.AddField(
            model_name='twittertopworst',
            name='tweet_index',
            field=models.IntegerField(default=0),
        ),
    ]
