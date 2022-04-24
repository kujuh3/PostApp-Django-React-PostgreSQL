from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from ListApp.models import Post, Poster
from ListApp.serializers import PostSerializer, PosterSerializer

# Create your views here.

@csrf_exempt
def postApi(request, id=1):
    if request.method == 'GET':
        post =  Post.objects.all()
        post_serializer = PostSerializer(post, many=True)
        return(JsonResponse(post_serializer.data,safe=False))

    elif request.method == 'POST':
        post_data = JSONParser().parse(request)
        post_serializer = PostSerializer(data = post_data)
        if post_serializer.is_valid():
            post_serializer.save()
            return JsonResponse("Added Succesfully", safe=False)
        return JsonResponse("Failed to add",safe=False)

    elif request.method == 'PUT':
        post_data = JSONParser().parse(request)
        post = Post.objects.get(PostId = post_data['PostId'])
        post_serializer = PostSerializer(post, data = post_data)
        if post_serializer.is_valid():
            post_serializer.save()
            return JsonResponse("Updated succesfully",safe = False)
        return JsonResponse("Failed to update")

    elif request.method == 'DELETE':
        post = Post.objects.get(PostId = id)
        post.delete()
        return JsonResponse("Delete succesful",safe=False)

@csrf_exempt
def posterApi(request, id=1):
    if request.method == 'GET':
        poster =  Poster.objects.all()
        poster_serializer = PosterSerializer(poster, many=True)
        return(JsonResponse(poster_serializer.data,safe=False))

    elif request.method == 'POST':
        poster_data = JSONParser().parse(request)
        poster_serializer = PosterSerializer(data = poster_data)
        if poster_serializer.is_valid():
            poster_serializer.save()
            return JsonResponse("Added Succesfully", safe=False)
        return JsonResponse("Failed to add",safe=False)

    elif request.method == 'PUT':
        poster_data = JSONParser().parse(request)
        poster = Poster.objects.get(PosterId = poster_data['PosterID'])
        poster_serializer = PostSerializer(poster, data = poster_data)
        if poster_serializer.is_valid():
            poster_serializer.save()
            return JsonResponse("Updated succesfully",safe = False)
        return JsonResponse("Failed to update")

    elif request.method == 'DELETE':
        poster = Poster.objects.get(PosterId = id)
        poster.delete()
        return JsonResponse("Delete succesful",safe=False)