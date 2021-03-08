from django.contrib import admin
from .models import Estate, User, Asset, Comment

class EstateAdmin(admin.ModelAdmin):
  list_display = ('name', 'description', 'is_complete')


class AssetAdmin(admin.ModelAdmin):
  list_display = ('name',
                  'to_be_distributed',
                  'to_be_thrown',
                  'to_be_donated',
                  'is_processed',
                  'description',
                  'image_url',
                  'category')

class UserAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'password', 'age', 'relation_to_dead')


class CommentAdmin(admin.ModelAdmin):
  list_display = ('submitter', 'text', 'is_deleted')

admin.site.register(Estate, EstateAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)