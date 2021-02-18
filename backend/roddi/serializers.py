from rest_framework import serializers
from .models import *

class AssetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Asset
    fields = (
      'id',
      'name',
      'description',
      'image_url',
      'category',
      'to_be_distributed',
      'to_be_thrown',
      'to_be_donated',
      'is_processed'
    )


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      'id',
      'name',
      'email',
      'age',
      'relation_to_dead',
      'latest_login'
    )


class EstateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Estate
    fields = (
      'id',
      'name',
      'description',
      'is_complete'
    )


class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = (
      'id',
      'text',
      'timestamp',
      'is_deleted'
    )

