from rest_framework import serializers
from ListApp.models import Post, Poster

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=('PostId','PostName','PostDate','PostUpdateDate','PostContent','PosterId')

class PosterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Poster
        fields=('PosterID','PosterName','Posts')