from django.shortcuts import render
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from .models import *
from django.http import HttpResponse
import json


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
  # JSON view for all the estates associated with a user.
  serializer_class = UserEstatesSerializer
  queryset = User.objects.all()

class EstateView(viewsets.ModelViewSet):
  serializer_class = EstateSerializer
  queryset = Estate.objects.all()

class CommentView(viewsets.ModelViewSet):
  serializer_class = CommentSerializer
  queryset = Comment.objects.all()

@csrf_exempt # THIS IS NOT SECURE
def reprioritize_view(request):
  # This is exempt from cross-site scripting protection to make
  # developent easier. If we can get the front end to store the
  # cookies required to validate the api request, this could
  # be made secure, but as we agreed upon, security is not a
  # primary concern.
  if request.method == "PUT":
    try:
      data = json.loads(request.body)
      user_id = data["user"]
      asset_id = data["asset"]
      new_priority = data["priority"]
    except:
      return HttpResponse(status=400) # bad request
    
    # TODO act on the correctly formatted request.
    print(user_id, asset_id, new_priority)

    return HttpResponse(status=204) # no content (apparently this is convention)
  else:
    return HttpResponse(status=405) # method not allowed