import jwt
from jwt import PyJWTError
from app.db import models, session
from app.db.schemas import  user_project_schemas
from app.db.server import get_user_by_email
from app.core.security import verify_password
from app.core import security
from app.db.schemas.user_project_schemas import CreateUser
from app.db.server import create_user
from fastapi import Depends, HTTPException, status


def authenticate_user(db, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not security.verify_password(password, user.password_hash):
        return False
    return user


def sign_up_new_user(db, email: str, password: str):

    user = get_user_by_email(db, email)
    if user:
        return False  # User already exists
    new_user = create_user(
        db,
        user_project_schemas.CreateUser(
            email=email,
            password=password,
            is_active=True,
            is_superuser=False,
            is_leader=False,
        ),
    )
    return new_user


async def get_current_user(
    db=Depends(session.get_db), token: str = Depends(security.oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token,security.SECRET_KEY ,algorithms=[security.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        permissions: str = payload.get("permissions")
        token_data = user_project_schemas.TokenData(email=email, permissions=permissions)
    except PyJWTError:
        raise credentials_exception
    user = get_user_by_email(db, token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_superuser(
    current_user: models.UserDB = Depends(get_current_user),
) -> models.UserDB:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user

async def get_current_active_leader(
    current_user: models.UserDB = Depends(get_current_user),
) -> models.UserDB:
    if not current_user.is_leader:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user

async def get_current_active_user(
    current_user: models.UserDB = Depends(get_current_user),
) -> models.UserDB:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    print("Current User 1  ==>",current_user.email)
    return current_user
