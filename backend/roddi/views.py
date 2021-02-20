from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *

class AssetView(viewsets.ModelViewSet):
  serializer_class = AssetSerializer
  queryset = Asset.objects.all()

class EstateAssetsView(viewsets.ModelViewSet):
  # JSON view of all the assets in a given estate.
  serializer_class = EstateAssetsSerializer
  queryset = Estate.objects.all()


class UserView(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()

class UserEstatesView(viewsets.ModelViewSet):
  serializer_class = UserEstatesSerializer
  queryset = User.objects.all()

class EstateView(viewsets.ModelViewSet):
  serializer_class = EstateSerializer
  queryset = Estate.objects.all()

class CommentView(viewsets.ModelViewSet):
  serializer_class = CommentSerializer
  queryset = Comment.objects.all()