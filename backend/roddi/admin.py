from django.contrib import admin
from .models import *

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

class UserRelationInline(admin.TabularInline):
    model = Relation
    extra = 2 # how many rows to show

class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'password', 'age')
    inlines = (UserRelationInline,)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('submitter', 'text')

admin.site.register(Estate, EstateAdmin)
admin.site.register(Asset, AssetAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Comment, CommentAdmin)
