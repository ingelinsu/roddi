"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from roddi import views

router = routers.DefaultRouter()
router.register(r'assets', views.AssetView, 'asset')
router.register(r'users', views.UserView, 'user')
router.register(r'estates', views.EstateView, 'estate')
router.register(r'comments', views.CommentView, 'comment')
router.register(r'estate-assets', views.EstateAssetsView, 'estate-assets')
router.register(r'user-estates', views.UserEstatesView, 'user-estates')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/vote/<int:user_id>&<int:asset_id>&<str:vote>', views.vote_view, name='vote'),
    path('api/reprioritize/<int:user_id>&<int:asset_id>&<new_prio>', views.reprioritize_view, name='reprioritize'),
    path('api/login/<str:email>&<str:password>', views.login_view, name='login'),
    path('api/register/<str:name>&<str:pw>&<int:age>&<str:email>', views.register_view, name='register'),
    path('api/approve/<int:user_id>&<int:estate_id>', views.approve_view, name='approve'),
    path('api/sorted-assets/<int:user_id>&<int:estate_id>', views.sorted_assets_view, name='sorted_assets'),
    path('api/relation-to-dead/<int:user_id>&<int:estate_id>', views.relation_to_dead_view, name='relation_to_dead'),
    path('api/asset-owner/<int:asset_id>', views.asset_owner_view, name='asset_owner'),
    path('api/general-stats/', views.general_stats_view, name='general_stats'),
    path('api/user-stats/', views.user_stats_view, name='user_stats')
]
