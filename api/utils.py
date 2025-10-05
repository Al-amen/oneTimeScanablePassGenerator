import os
import qrcode
from django.conf import settings
from django.core.mail import send_mail

def generate_qr_code(unique_id):
    qr_code_dir = os.path.join(settings.MEDIA_ROOT, 'qr_codes')
    
    if not os.path.exists(qr_code_dir):
        os.makedirs(qr_code_dir)
    
    file_name = f'{unique_id}.png'
    file_path = os.path.join(qr_code_dir, file_name)
    
    qrcode.make(f'http://localhost:5173/validate/{unique_id}').save(file_path)

    # Return the relative path for use with MEDIA_URLr
    return f'qr_codes/{file_name}'


def mail(user):
    email_subject = 'Your Event Pass Details'
    email_message = (
        f"Dear {user.name},\n\n"
        "Your registration has been approved. Please find your unique ID below:\n"
        f"http://localhost:5173/pass_detail/{user.unique_id}\n\n"
        "Please keep this ID safe as it will be required for entry.\n\n"
        "Thanks and Regards,\nEvent Team"
    )

    try:
        send_mail(
            subject=email_subject,
            message=email_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False
        )
    except Exception as e:
        print("❌ Email failed to send:", e)
        