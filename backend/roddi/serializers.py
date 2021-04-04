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
      'is_processed',
      'belongs_to',
      'comments',
      'distribute_votes',
      'throw_votes',
      'donate_votes'
    )

class EstateAssetsSerializer(serializers.ModelSerializer):
    assets = AssetSerializer(many=True)
    class Meta:
        model = Estate
        fields = (
            'id',
            'assets',
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'email',
            'age',
            'obtained_assets',
            'latest_login',
            'comments'
        )


class EstateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estate
        fields = (
            'id',
            'name',
            'description',
            'users',
            'assets',
            'approvals',
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

class AssetCommentsSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    class Meta:
        model = Asset
        fields = (
            'id',
            'comments',
        )

class UserEstatesSerializer(serializers.ModelSerializer):
    estate_set = EstateSerializer(many=True)
    class Meta:
        model = User
        fields = (
            'id',
            'estate_set',
        )

class UserComments(serializers.ModelSerializer):
    submitter = UserSerializer(many=True)
    class Meta:
        model = User
        fields = (
            'id',
            'submitter',
        )