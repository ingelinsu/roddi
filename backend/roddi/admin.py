from django.contrib import admin
from .models import Asset

class AssetAdmin(admin.ModelAdmin):
  list_display = ('name', 'description')

admin.site.register(Asset, AssetAdmin)