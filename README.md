# 🔐 RS256 JWT Authentication System

![Auth Banner](https://dummyimage.com/1200x300/0a2563/ffffff.png&text=RS2560+JWT+Authentication)

A robust authentication system built with FastAPI and Vue.js, implementing JWT authentication with RS256 algorithm for enhanced security.

## ✨ Features

- **🔑 RS256 JWT Authentication** - Asymmetric cryptography for enhanced security
- **🔄 Token Rotation** - Access tokens and refresh tokens with automatic renewal
- **👤 User Management** - User profiles, authentication, and authorization
- **🛡️ Protected Routes** - Both backend and frontend route protection
- **🔒 Secure Password Handling** - Bcrypt hashing for password storage
- **🌐 RESTful API** - Clean API design with FastAPI
- **⚡ Modern Frontend** - Vue 3 with Composition API
- **🔌 State Management** - Vuex for global state management

## 🏗️ Architecture

### Backend (FastAPI)

```
backend/
├── app/
│   ├── auth/                # Authentication logic
│   │   ├── jwt_handler.py   # JWT generation and validation
│   │   └── routes.py        # Auth endpoints
│   ├── users/               # User management
│   │   ├── models.py        # User models
│   │   └── routes.py        # User endpoints
│   └── config.py            # App configuration
├── main.py                  # FastAPI app entry point
├── private_key.pem          # RS256 private key
└── public_key.pem           # RS256 public key
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Create a virtual environment**
   ```bash
   cd backend # Assuming you are in the project directory
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Generate RSA keys**
   ```bash
   openssl genrsa -out private_key.pem 2048
   openssl rsa -in private_key.pem -pubout -out public_key.pem
   ```

4. **Run the server**
   ```bash
   uvicorn main:app --reload --port 8080
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

## 📝 API Documentation

Once the backend is running, access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
