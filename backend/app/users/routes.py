from typing import Annotated

from app.auth.jwt_handler import get_current_user
from app.users.models import User, fake_users_db
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[User])
async def get_users(current_user: Annotated[User, Depends(get_current_user)]):
    """
    Fetch a list of users (requires authentication)
    """
    return [User(**user_data) for user_data in fake_users_db.values()]


@router.get("/{user_id}", response_model=User, dependencies=[Depends(get_current_user)])
async def get_user(user_id: int):
    """
    Fetch a user by ID (requires authentication)
    """
    if user_id not in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Usuário com ID {user_id} não encontrado",
        )
    return User(**fake_users_db[user_id])
