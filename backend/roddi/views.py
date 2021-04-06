from django.shortcuts import render
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
import django.core.serializers
from django.forms.models import model_to_dict
from .serializers import *
from .models import *
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
import json
import datetime


class AssetView(viewsets.ModelViewSet):
    serializer_class = AssetSerializer
    queryset = Asset.objects.all()

class EstateAssetsView(viewsets.ModelViewSet):
    # JSON view of all the assets in a given estate.
    serializer_class = EstateAssetsSerializer
    queryset = Estate.objects.all()

class AssetCommentsView(viewsets.ModelViewSet):
    # JSON view of all the comments in a given asset.
    serializer_class = AssetCommentsSerializer
    queryset = Asset.objects.all()

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class UserEstatesView(viewsets.ModelViewSet):
    # JSON view for all the estates associated with a user.
    serializer_class = UserEstatesSerializer
    queryset = User.objects.all()

class AssetCommentsView(viewsets.ModelViewSet):
    # JSON view for all the estates associated with a user.
    serializer_class = AssetCommentsSerializer
    queryset = Asset.objects.all()

class EstateView(viewsets.ModelViewSet):
    serializer_class = EstateSerializer
    queryset = Estate.objects.all()

class CommentView(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


@api_view(['GET'])
def sorted_assets_view(request, user_id, estate_id):
    """
    Reprioritizes the users wish list based on REST query.
    user_id     ID of user
    asset_id    ID of asset
    new_prio    Integer priority to be assigned
    """
    user = User.objects.get(id=user_id)
    estate = Estate.objects.get(id=estate_id)
    assets = user.get_ordered_wishlist(estate.id)

    json_response = {
        'assets': [{'id': asset.id,
                   'name': asset.name,
                   'description': asset.description,
                   'image_url': asset.image_url,
                   'category': asset.category,
                   'to_be_distributed': asset.to_be_distributed,
                   'to_be_thrown': asset.to_be_thrown,
                   'to_be_donated': asset.to_be_donated,
                   'is_processed': asset.is_processed,
                   'belongs_to': asset.belongs_to.id if asset.belongs_to else asset.belongs_to,
                   'distribute_votes': [v.id for v in asset.distribute_votes.all()],
                   'throw_votes': [v.id for v in asset.throw_votes.all()],
                   'donate_votes': [v.id for v in asset.donate_votes.all()]
            } for asset in assets]
    }

    return Response(json_response)


@api_view(['GET'])
def relation_to_dead_view(request, user_id, estate_id):
    user = User.objects.get(id=user_id)
    estate = Estate.objects.get(id=estate_id)
    json_response = {'relation': Relation.objects.get(user=user, estate=estate).relation}
    return Response(json_response)


@api_view(['GET'])
def login_view(request, email, password):
    if User.objects.filter(email=email, password=password).exists():
        user = User.objects.get(email=email, password=password)
    else:
        return HttpResponse('User ID not valid', status=400) # bad request
    json_response = {'id': user.id}
    user.latest_login = datetime.datetime.now()
    user.save()
        
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


@api_view(['GET'])
def priority_view(request, user_id, asset_id):
    """
    Get priority of user for this asset.
    user_id     ID of user
    asset_id    ID of asset
    """
    user = User.objects.get(id=user_id)
    asset = Asset.objects.get(id=asset_id)

    priority = Wish.objects.get(user=user, asset=asset).priority
    return Response({'priority': priority})


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
        estate = Estate.objects.get(id=estate_id)
    else:
        return HttpResponse('Estate ID not valid', status=400) # bad request
    estate.approve(user)
    estate.save()
    return HttpResponse(status=204) # no content


@api_view(['GET'])
def approved_view(request, user_id, estate_id):
    """
    Check if estate is approved by user
    user_id    INT id for the user
    estate_id  INT id for the estate
    """
    if Estate.objects.filter(id=estate_id).exists():
        estate = Estate.objects.get(id=estate_id)
    else:
        return HttpResponse('Estate ID not valid', status=400) # bad request
    return Response({'approved': estate.approvals.filter(id=user_id).exists()})


@api_view(['GET'])
def general_stats_view(request):
    number_of_estates = Estate.objects.count()
    number_of_users = User.objects.count()
    number_of_assets = Asset.objects.count()
    number_of_comments = Comment.objects.count()
    json_response = {
        'number_of_estates': number_of_estates,
        'unfinished_estates': sum(e.is_complete for e in Estate.objects.all()),
        'number_of_users': User.objects.count(),
        'users_active_today': sum(u.latest_login.replace(tzinfo=None) > datetime.datetime.now() - datetime.timedelta(days=1) for u in User.objects.all()),
        'users_active_week': sum(u.latest_login.replace(tzinfo=None) > datetime.datetime.now() - datetime.timedelta(days=7) for u in User.objects.all()),
        'users_active_month': sum(u.latest_login.replace(tzinfo=None) > datetime.datetime.now() - datetime.timedelta(days=30) for u in User.objects.all()),
        'users_per_estate': number_of_users / number_of_estates,
        'assets_per_estate': Asset.objects.count() / number_of_estates,
        'number_of_comments': Comment.objects.count(),
        'commenting_users_percent': sum(u.comments.count() > 0 for u in User.objects.all()) / User.objects.count(),
        'number_of_parents': Relation.objects.filter(relation='parent').count(),
        'number_of_siblings': Relation.objects.filter(relation='sibling').count(),
        'number_of_piblings': Relation.objects.filter(relation='pibling').count(),
        'number_of_grandparents': Relation.objects.filter(relation='grandparent').count(),
        'number_of_children': Relation.objects.filter(relation='children').count(),
        'number_of_grandchildren': Relation.objects.filter(relation='grandchildren').count(),
        'number_of_others': Relation.objects.filter(relation='other').count(),
    }

    return Response(json_response)

@api_view(['GET'])
def commentSub_view(request, user_id, asset_id, text):
    """
    Lets the logged in user make a comment on an asset.
    user_id     ID of user
    asset_id    ID of asset
    text    the content of the comment being submitted
    """
    user = User.objects.get(id=user_id)
    asset = Asset.objects.get(id=asset_id)

    #Creating a comment through the comment method within asset based on API call
    comment = asset.comment(user, text)

    asset.save()
    user.save()
    comment.save()
    
    return HttpResponse(status=204) # no content


@api_view(['GET'])
def user_stats_view(request):
    users = User.objects.all()
    json_response = {
        user.id: {
            'age': user.age,
            'latest_login': user.latest_login
        }
        for user in users
    }

    return Response(json_response)


@api_view(['GET'])
def asset_owner_view(request, asset_id):
    if Asset.objects.filter(id=asset_id).exists():
        asset = Asset.objects.get(id=asset_id)
        if asset.belongs_to is not None:
            json_response = {
                'id': asset.belongs_to.id,
                'name': asset.belongs_to.name
            }
            return Response(json_response)
    return HttpResponse('Asset has no owner', status=400) # bad request


@api_view(['POST'])
def post_comment_view(request, user, asset):
    user = get_object_or_404(User, id=user)
    asset = get_object_or_404(Asset, id=asset)

    comment = Comment(submitter = user, 
                      asset     = asset, 
                      text      = request.body.decode('utf-8'))

    comment.save()

    return Response({"status": "ok"})

@api_view(['DELETE'])
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    comment.is_deleted = True
    comment.save()

    return Response({"status": "ok"})

@api_view(['PUT'])
def edit_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    comment.text = request.body.decode('utf-8')
    comment.save()

    return Response({"status": "ok"})
