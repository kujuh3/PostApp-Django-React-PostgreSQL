from django.db import models

# Create your models here.


class Post(models.Model):
    PostId = models.AutoField(primary_key=True)
    PostName = models.CharField(max_length=100)
    PostDate = models.DateTimeField(auto_now_add=True)
    PostUpdateDate = models.DateTimeField(auto_now=True)
    PostContent = models.TextField()
    PosterId = models.IntegerField()


class Poster(models.Model):
    PosterID = models.AutoField(primary_key=True)
    PosterName = models.CharField(max_length=100)
    Posts = models.IntegerField()