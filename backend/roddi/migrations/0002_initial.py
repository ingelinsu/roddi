# Generated by Django 3.1.2 on 2021-04-03 12:49

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import roddi.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('id', models.IntegerField(default=roddi.models.Asset._get_id, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='', max_length=120)),
                ('description', models.TextField(blank=True, default='')),
                ('image_url', models.CharField(blank=True, default='', max_length=120)),
                ('category', models.CharField(default='', max_length=120)),
                ('to_be_distributed', models.BooleanField(default=True)),
                ('to_be_thrown', models.BooleanField(default=False)),
                ('to_be_donated', models.BooleanField(default=False)),
                ('is_processed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.IntegerField(default=roddi.models.Comment._get_id, editable=False, primary_key=True, serialize=False)),
                ('text', models.CharField(default='', max_length=120)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('asset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='roddi.asset')),
            ],
        ),
        migrations.CreateModel(
            name='Estate',
            fields=[
                ('id', models.IntegerField(default=roddi.models.Estate._get_id, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True, default='')),
                ('is_complete', models.BooleanField(default=False, editable=False)),
                ('send_reminder_email', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Relation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('relation', models.CharField(choices=[('sibling', 'Sibling'), ('parent', 'Parent'), ('pibling', 'Uncle/Aunt'), ('grandparent', 'Grandparent'), ('child', 'Child'), ('grandchild', 'Grandchild'), ('other', 'Other')], default='other', max_length=120)),
                ('estate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='roddi.estate')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.IntegerField(default=roddi.models.User._get_id, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='', max_length=120)),
                ('email', models.EmailField(default='', max_length=254)),
                ('password', models.CharField(default='', max_length=120)),
                ('age', models.IntegerField(validators=[django.core.validators.MaxValueValidator(150), django.core.validators.MinValueValidator(18)])),
                ('latest_login', models.DateTimeField(auto_now_add=True)),
                ('comments', models.ManyToManyField(blank=True, to='roddi.Comment')),
                ('obtained_assets', models.ManyToManyField(blank=True, to='roddi.Asset')),
                ('relation_to_dead', models.ManyToManyField(related_name='relation_to_dead', through='roddi.Relation', to='roddi.Estate')),
            ],
        ),
        migrations.CreateModel(
            name='Wish',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('asset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='roddi.asset')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='roddi.user')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='wish_list',
            field=models.ManyToManyField(related_name='wish_list', through='roddi.Wish', to='roddi.Asset'),
        ),
        migrations.AddField(
            model_name='relation',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='roddi.user'),
        ),
        migrations.AddField(
            model_name='estate',
            name='approvals',
            field=models.ManyToManyField(blank=True, related_name='approvals', to='roddi.User'),
        ),
        migrations.AddField(
            model_name='estate',
            name='assets',
            field=models.ManyToManyField(blank=True, to='roddi.Asset'),
        ),
        migrations.AddField(
            model_name='estate',
            name='users',
            field=models.ManyToManyField(blank=True, to='roddi.User'),
        ),
        migrations.AddField(
            model_name='comment',
            name='submitter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='roddi.user'),
        ),
        migrations.AddField(
            model_name='asset',
            name='belongs_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='roddi.user'),
        ),
        migrations.AddField(
            model_name='asset',
            name='distribute_votes',
            field=models.ManyToManyField(blank=True, related_name='distribute_votes', to='roddi.User'),
        ),
        migrations.AddField(
            model_name='asset',
            name='donate_votes',
            field=models.ManyToManyField(blank=True, related_name='donate_votes', to='roddi.User'),
        ),
        migrations.AddField(
            model_name='asset',
            name='throw_votes',
            field=models.ManyToManyField(blank=True, related_name='throw_votes', to='roddi.User'),
        ),
    ]
