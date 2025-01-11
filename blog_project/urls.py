# blog_project/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render

# Serve React app's index.html for the root URL
def index(request):
    return render(request, 'blog-frontend/build/index.html')  # Corrected template name

# API router setup for blog posts and comments
from blog.views import PostViewSet, CommentViewSet
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin page URL
    path('', index),  # Serve React app at the root URL
    path('api/', include(router.urls)),  # API routes for posts and comments
]

# Serve static files if in DEBUG mode (like React build assets)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
