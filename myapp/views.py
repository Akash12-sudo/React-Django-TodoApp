from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task

# Create your views here.


@api_view(['GET'])
def appView(request):

    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def taskList(request):

    tasks = Task.objects.all()
    serializers = TaskSerializer(tasks, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def taskDetails(request, pk):

    tasks = Task.objects.get(id=pk)
    serializers = TaskSerializer(tasks, many=False)
    return Response(serializers.data)


@api_view(['POST'])
def createList(request):

    serializers = TaskSerializer(data=request.data)

    if serializers.is_valid():
        serializers.save()

    return Response(serializers.data)


@api_view(['POST'])
def updateList(request, pk):

    task = Task.objects.get(id=pk)
    serializers = TaskSerializer(instance=task, data=request.data)

    if (serializers.is_valid()):
        serializers.save()

    return Response(serializers.data)


@api_view(['DELETE'])
def deleteList(request, pk):

    task = Task.objects.get(id=pk)
    task.delete()

    return Response("Item deleted successfully")