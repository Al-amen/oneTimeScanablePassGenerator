from django.shortcuts import render
from api.serializers import RegistrationSerializer, PendingSerializer,PassSerializer
from registrations.models import Registration
from EntryPass.models import EntryPass
from rest_framework import generics
import uuid
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.utils import generate_qr_code
from api.utils import mail

class RegistrationViewSet(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    

class PendingViewSet(generics.ListAPIView):
    queryset = Registration.objects.filter(status='Pending')
    serializer_class = PendingSerializer


class ApproveRegistrationViewSet(generics.UpdateAPIView):
    queryset = Registration.objects.all()
    serializer_class = PendingSerializer
    lookup_field = 'unique_id'
    
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 'Approved'
        
        EntryPass.objects.get_or_create(
            name=instance,
            defaults={
                'event_name': 'Food',
                'qr_code': generate_qr_code(instance.unique_id),
                'unique_id': instance.unique_id
            }
        )
        # Send email to user
        mail(instance)
        instance.save() 
         # Serialize and return the updated instance
        serializer = self.get_serializer(instance)
        
        
        return Response(serializer.data, status=status.HTTP_200_OK)


            
class PassDetailViewSet(generics.RetrieveAPIView):
    queryset = EntryPass.objects.all()
    serializer_class = PassSerializer
    lookup_field = 'unique_id'

    def get_serializer_context(self):
        return {'request': self.request}


class ValidateClass(APIView):
    def get(self, request, unique_id):
        try:
            entry_pass = EntryPass.objects.get(unique_id=unique_id)
            if entry_pass.is_used:
                return Response({
                    "valid": False,
                    "message": "This pass has already been used.",
                    "name": entry_pass.name.name,  # related Registration name
                    "event_name": entry_pass.event_name
                }, status=status.HTTP_200_OK)
            else:
                entry_pass.is_used = True
                entry_pass.save()
                return Response({
                    "valid": True,
                    "message": "This pass is valid and has now been marked as used.",
                    "name": entry_pass.name.name,
                    "event_name": entry_pass.event_name
                }, status=status.HTTP_200_OK)
        except EntryPass.DoesNotExist:
            return Response({
                "valid": False,
                "message": "This pass does not exist."
            }, status=status.HTTP_404_NOT_FOUND)