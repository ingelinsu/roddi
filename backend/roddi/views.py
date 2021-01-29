from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AssetSerializer
from .models import Asset

class AssetView(viewsets.ModelViewSet):
  serializer_class = AssetSerializer
  queryset = Asset.objects.all()