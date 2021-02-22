from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *

class AssetView(viewsets.ModelViewSet):
  serializer_class = AssetSerializer
  queryset = Asset.objects.all()


class UserView(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()

class EstateView(viewsets.ModelViewSet):
  serializer_class = EstateSerializer
  queryset = Estate.objects.all()

class CommentView(viewsets.ModelViewSet):
  serializer_class = CommentSerializer
  queryset = Comment.objects.all()


@api_view(['GET'])
@authentication_classes((SessionAuthentication, BasicAuthentication))
@permission_classes((IsAuthenticated,))
def login(request, email, password):
    users = User.objects.all()
    matching_users = [u for u in users if u.email==email and u.password==password]
    if len(matching_users) > 0:
      json_response = {'id': matching_users[0].id}
    else:
      json_response = {'denied': 'wrong credentials'}
    return Response(json_response)