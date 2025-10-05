from django.urls import include, path
from rest_framework import routers
from .import views

urlpatterns = [
    # Define your API endpoints here
    path('registration/', views.RegistrationViewSet.as_view(), name='registration'),
    path('pending/', views.PendingViewSet.as_view(), name='pending'),
    path('approve/<str:unique_id>/', views.ApproveRegistrationViewSet.as_view(), name='approve-registration'),
    path('pass_detail/<str:unique_id>/', views.PassDetailViewSet.as_view(), name='pass-detail'),
    path('validate/<str:unique_id>/', views.ValidateClass.as_view(), name='validate-pass'),
]
