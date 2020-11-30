# Generated by Django 3.1.2 on 2020-11-30 21:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TwitterModel',
            fields=[
                ('email', models.CharField(default='', max_length=70)),
                ('name', models.CharField(default='', max_length=70)),
                ('user_id', models.IntegerField(default=0, primary_key=True, serialize=False, unique=True)),
                ('screen_name', models.CharField(default='', max_length=70)),
                ('description', models.CharField(default='', max_length=1000)),
                ('followers_count', models.IntegerField(default=0)),
                ('friends_count', models.IntegerField(default=0)),
                ('statuses_count', models.IntegerField(default=0)),
                ('auth_token', models.CharField(default='', max_length=2000)),
                ('auth_token_secret', models.CharField(default='', max_length=2000)),
            ],
        ),
        migrations.CreateModel(
            name='TwitterTopWorst',
            fields=[
                ('tweet_id', models.IntegerField(default=0, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(default='', max_length=70)),
                ('screen_name', models.CharField(default='', max_length=70)),
                ('retweet_count', models.IntegerField(default=0)),
                ('text', models.CharField(default='', max_length=280)),
                ('favorite_count', models.IntegerField(default=0)),
                ('tweet_index', models.IntegerField(default=0)),
                ('user_twitter_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='twitter.twittermodel')),
            ],
        ),
    ]
