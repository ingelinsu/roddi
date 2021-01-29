from django.db import models

class Asset(models.Model):
  name = models.CharField(max_length=120)
  description = models.TextField()

  def _str_(self):
    return self.title