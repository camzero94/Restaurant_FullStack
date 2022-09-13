from os import wait
from pydantic import ValidationError
from fastapi import APIRouter, Request, Depends, Response, encoders
from app.db.schemas.user_project_schemas import CreateUser, User, EditUser
from app.db.session import get_db
from app.db.server import (get_user,get_users,create_user,deleter_user,edit_user)
from app.core.auth import get_current_active_superuser, get_current_active_user, get_current_user
import typing as t

user_router = r = APIRouter()

@r.get(
    "/users",
    response_model=t.List[User],
    response_model_exclude_none=True,
)
async def users_list(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Get all users
    """
    users = get_users(db)
    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(users)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    print (users) 
    return users

@r.post("/users", response_model=User, response_model_exclude_none=True)
async def user_create(
    request: Request,
    user: CreateUser,
    db=Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """
    Create a new user
    """
    return create_user(db, user)

@r.get("/users/me", response_model=User, response_model_exclude_none=True)
async def user_me(current_user=Depends(get_current_active_user)):
    """
    Get own user
    """

    print("Current==>",current_user)
    return current_user

@r.put(
    "/users/{id}", response_model=User, response_model_exclude_none=True
)
async def user_edit(
    request: Request,
    id: int,
    user: EditUser,
    db=Depends(get_db),
    current_user = Depends(get_current_active_user ),
):
    """
    Update existing user
    """
    print(id,user.dict())
    user_db : User = edit_user(db, id, user)

    return user_db 
