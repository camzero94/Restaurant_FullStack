from turtle import title
from pydantic import BaseModel
from datetime import datetime
import typing as t


class BaseUser(BaseModel):
    username: str = None
    firstname: str = None 
    lastname: str = None
    email: str
    companyname: str = None
    cellphone: str = None
    is_active: bool = True
    is_superuser: bool= False
    is_leader:bool=False


class CreateUser(BaseUser):
    password: str
    class Config:
        orm_mode = True

class EditUser(BaseUser):
    password: t.Optional[str] = None 
    class Config:
        orm_mode = True

class User(BaseUser):
    id:int 
    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token:str
    token_type: str


class TokenData(BaseModel):
    email:str = None  
    permissions: str = 'follower'

#Project Schemas
class BaseProject(BaseModel):
    projectName:str
    nameOfLeader:str = None
    description:str = None

class CreateProject(BaseProject):
    createdAtTime:datetime = None
    class Config:
        orm_mode = True

class Project(BaseProject):
    projectId:int 
    class Config:
        orm_mode = True

   
class UpdateProject(BaseProject):
    updatedAtTime:datetime 
    class Config:
        orm_mode = True

class User_TableSchema(BaseModel):
    extraData:str
    userId:t.Optional[int] =None
    projectId:t.Optional[int]=None
    user:t.Optional[User] = None
    project:t.Optional[CreateProject] = None
    class Config:
        orm_mode = True

# class UserSchema(BaseUser):
#     id:int 
#     password: str
#     projects: t.List[User_TableSchema]

class ProjectSchema(BaseProject):
    projectId:int 
    createdAtTime:datetime
    updatedAtTime:datetime = None 
    users: t.Optional[t.List[User_TableSchema]] 

    class Config:
        orm_mode = True
        arbitrary_types_allowed =True

