from django.shortcuts import render
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
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


@api_view(['GET'])
def login_view(request, email, password):
    users = User.objects.all()
    matching_users = [u for u in users if u.email==email and u.password==password]
    if len(matching_users) > 0:
        json_response = {'id': matching_users[0].id}
    else:
        json_response = {'denied': 'wrong credentials'}
    return Response(json_response)

@api_view(['GET'])
def reprioritize_view(request, user_id, asset_id, new_prio):
    """
    Reprioritizes the users wish list based on REST query.
    user_id     ID of user
    asset_id    ID of asset
    new_prio    Integer priority to be assigned
    """
    user = User.objects.get(id=user_id)
    asset = Asset.objects.get(id=asset_id)

    # Apply repriotitization
    user.reprioritize(asset, new_prio)

    # The response can be safely ignored, but we might as well
    # return something, so resolving the IDs seems fitting in
    # case it ends up being useful.
    return Response({'reprioritized': [user.name, asset.name]})


def vote_view(request, user_id, asset_id, vote):
    """
    Set or change users vote for how to handle an asset.
    user_id    INT id for the user
    asset_id   INT id for the asset
    vote       STR the vote. Must be "distribute", "throw", "donate" (or "withdraw" for withdrawing vote)
    """
    if User.objects.filter(id=user_id).exists():
        user = User.objects.get(id=user_id)
    else:
        return HttpResponse('User ID not valid', status=400) # bad request
    if Asset.objects.filter(id=asset_id).exists():
        asset = Asset.objects.get(id=asset_id)
    else:
        return HttpResponse('Asset ID not valid', status=400) # bad request
    asset.vote(user, vote)
    return HttpResponse(status=204) # no content

def register_view(request, name, pw, age, email):
    """
    Registers a new user with a REST query.
    name    STR name for the user
    pw      STR password for the user
    age     INT age of the user
    email   STR users email
    """
    user = User(name=name, password=pw, age=age, email=email)
    user.save()
    return HttpResponse(status=204) # no content

def approve_view(request, user_id, estate_id):
    """
    Approve an estate, i. e. vote for starting distribution
    user_id    INT id for the user
    estate_id  INT id for the estate
    """
    if User.objects.filter(id=user_id).exists():
        user = User.objects.get(id=user_id)
    else:
        return HttpResponse('User ID not valid', status=400) # bad request
    if Estate.objects.filter(id=estate_id).exists():
        estate = Estate.objects.get(id=asset_id)
    else:
        return HttpResponse('Asset ID not valid', status=400) # bad request
    estate.approve(user)
    estate.save()
    return HttpResponse(status=204) # no content
