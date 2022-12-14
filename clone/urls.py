"""clone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ohio import views
from  clone import settings
from django.views.static import serve
from django.conf.urls import url

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls, ),
    path('about/', views.about, name='about'),
    path('location/', views.location, name='location'),
    path('contact/', views.contact, name='contact'),
    path('menu/', views.menu, name='menu'),
    path('cart/', views.cart, name='cart'),
    url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}),
]
