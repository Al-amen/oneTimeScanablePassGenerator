# 🎟️ One-Time Scannable QR Pass Generator

This is a Django + React based application for registering users, generating unique QR codes as event entry passes, and validating those passes at the gate. Once validated, a pass cannot be reused.


## 🚀 Features

- ✅ User registration with unique ID generation
- 📧 Email notification on approval with unique ID
- 📄 Auto QR code generation and image saving
- 🎫 One-to-one mapping of QR code to user (only one valid entry)
- 📡 API endpoints for:
  - Approving registrations
  - Viewing QR pass details
  - Validating passes
- 🖼️ React frontend to:
  - Show generated QR pass
  - Show pass validation result




## 🛠️ Tech Stack

### Backend:
- Django
- Django REST Framework
- SQLite3 (default, easy to switch to PostgreSQL)
- Pillow (for image handling)
- `qrcode` Python library

### Frontend:
- React (Vite or CRA)
- Axios for API calls
- Bootstrap for styling (optional)
