import uuid
from rest_framework import serializers

import EntryPass.models as EntryPass
from registrations.models import Registration

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ('roll_number','name','email')
    
    def create(self, validated_data):
        validated_data['unique_id'] = str(uuid.uuid4().hex)
        return super().create(validated_data)


class PendingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ('roll_number','name','email','status','unique_id')



class PassSerializer(serializers.ModelSerializer):
    # Show the name of the related Registration object
    name = serializers.CharField(source='name.name', read_only=True)
    qr_code = serializers.SerializerMethodField()

    class Meta:
        model = EntryPass.EntryPass
        fields = ('name', 'event_name', 'qr_code', 'is_used', 'unique_id')

    def get_qr_code(self, obj):
        request = self.context.get('request')
        if obj.qr_code:
            return request.build_absolute_uri(obj.qr_code.url)
        return None
