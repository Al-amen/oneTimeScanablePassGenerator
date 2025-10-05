from django.db import models
from registrations.models import Registration

class EntryPass(models.Model):
    name = models.OneToOneField(Registration, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=100)
    qr_code = models.ImageField(upload_to='qr_codes/')
    is_used = models.BooleanField(default=False)
    unique_id = models.CharField(max_length=100,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"EntryPass for {self.name.name} - {self.event_name}"
