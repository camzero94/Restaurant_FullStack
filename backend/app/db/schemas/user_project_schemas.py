
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

class Project(CreateProject):
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

#Items Schema
class BaseItem(BaseModel):
    nameItem:str 
    type:str
    cooking:bool
    quantity:int = None
    unit:str = None
    price:float
    summary:str = None
    image_url:str

class CreateItem(BaseItem):
    createdAtTime:datetime = None
    class Config:
        orm_mode = True

class Item(CreateItem):
    itemId:int
    class Config:
        orm_mode = True

class UpdateItem(Item):
    updatedAtTime:datetime 
    class Config:
        orm_mode = True



##Ingredients Schema
class BaseIngredient(BaseModel):
    nameIngredient:str 
    quantity:int
    unit:str 
    summary:str = None
    image_url:str

class CreateIngredient(BaseIngredient):
    createdAtTime:datetime = None
    class Config:
        orm_mode = True

    
class Ingredient(CreateIngredient):
    ingredientId:int
    class Config:
        orm_mode = True

class UpdateIngredient(BaseIngredient):
    updatedAtTime:datetime 
    class Config:
        orm_mode = True

# Menu Schema
class BaseMenu(BaseModel):
    nameMenu:str 
    description:str
    type:str
    summary:str = None
    image_url:str
    is_active: bool=False

class CreateMenu(BaseMenu):
    createdAtTime:datetime = None
    items: t.List[Item]
    add:t.Optional[bool] = False
    delete:t.Optional[bool] = False
    edit_flag: bool = False
    class Config:
        orm_mode = True
        arbitrary_types_allowed =True

    
class Menu(CreateMenu):
    MenuId:int
    class Config:
        orm_mode = True

class UpdateMenu(BaseMenu):
    updatedAtTime:datetime 
    class Config:
        orm_mode = True

#Schemas Ingredient, Item,Project , Menu

class Recipe_TableSchema(BaseModel):

    ingredientId:t.Optional[int] =None
    itemId:t.Optional[int]=None
    instructions:str
    quantity:str
    unit:float
    item: t.Optional[Item]
    ingredient:t.Optional[Ingredient]

    class Config:
        orm_mode = True
        arbitrary_types_allowed =True

class IngredientSchema(BaseIngredient):

    ingredientId:int
    createdAtTime:datetime
    updatedAtTime:datetime = None 
    projectId:int
    # project: t.Optional[Project]
    items:t.List[Item]

    class Config:
        orm_mode = True
        arbitrary_types_allowed =True

class ItemSchema(BaseItem):
    createdAtTime:datetime
    updatedAtTime:t.Optional[datetime]
    ingredients: t.List[Ingredient]
    menus:t.Optional[t.List[Menu]]
    add:t.Optional[bool] = False
    delete:t.Optional[bool] = False
    edit_flag: bool = False

    class Config:
        orm_mode = True
        arbitrary_types_allowed =True

# class Menu_ItemSchema(BaseModel):
#
#     menuId:t.Optional[int] =None
#     itemId:t.Optional[int]=None
#     active:bool = False
#     item: t.Optional[Item]
#     menu:t.Optional[Ingredient]
#
#     class Config:
#         orm_mode = True
#         arbitrary_types_allowed =True
class MenuSchema(BaseMenu):

    createdAtTime:datetime
    updatedAtTime:t.Optional[datetime]
    items: t.List[Item]

    class Config:
        orm_mode = True
        arbitrary_types_allowed =True


class ProjectSchema(BaseProject):
    projectId:int 
    createdAtTime:datetime
    updatedAtTime:datetime = None 
    users: t.Optional[t.List[User_TableSchema]] 
    ingredients:t.List[IngredientSchema]

    class Config:
        orm_mode = True
        arbitrary_types_allowed =True

