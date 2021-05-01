from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.appView, name='app'),
    path('task-list/', views.taskList, name='task-list'),
    path('task-detail/<str:pk>', views.taskDetails, name='task-detail'),
    path('task-create/', views.createList, name='task-create'),
    path('task-update/<str:pk>', views.updateList, name='task-update'),
    path('task-delete/<str:pk>', views.deleteList, name='task-delete'),
]
