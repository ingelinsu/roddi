from django.contrib import admin
from .models import Estate, User, Asset, Comment

class EstateAdmin(admin.ModelAdmin):
  list_display = ('name', 'description', 'is_complete')


class AssetAdmin(admin.ModelAdmin):
  list_display = ('name', 'is_processed', 'to_be_distributed', 'to_be_donated', 'to_be_thrown')


class UserAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'password', 'age', 'relation_to_dead')


class CommentAdmin(admin.ModelAdmin):
  list_display = ('submitter', 'text', 'is_deleted')

admin.site.register(Estate, EstateAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)