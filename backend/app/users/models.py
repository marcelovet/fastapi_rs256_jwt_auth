from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserDB(UserBase):
    id: int
    hashed_password: str
    is_active: bool = True


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True


# Banco de dados simulado (em produção use um banco de dados real)
fake_users_db = {
    1: {
        "id": 1,
        "email": "user@example.com",
        "username": "testuser",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "secret"
        "is_active": True,
    }
}
