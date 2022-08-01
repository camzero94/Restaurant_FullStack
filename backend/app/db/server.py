from fastapi import HTTPException,status
from sqlalchemy.orm import Session,joinedload
import typing as t
from app.db import models,schemas 
from app.core.security import get_password_hash
from pydantic import ValidationError



def get_user(db:Session, id:int):
    user = db.query(models.UserDB).filter(models.UserDB.id == id).first()
    print(user)
    db.commit()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_project(db:Session, id:int):
    user = db.query(models.ProjectDB).filter(models.ProjectDB.projectId== id).first()
    db.commit()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_user_by_email(db:Session, email:str) ->schemas.User:
    user = db.query(models.UserDB).filter(models.UserDB.email == email).first()
    db.commit()
    return user

def get_users(db:Session, skip:int=0, limit: int =100):
    users = db.query(models.UserDB).offset(skip).limit(limit).all()
    db.rollback()

    return users

def create_user(db:Session, user:schemas.CreateUser):
    password_hash= get_password_hash(user.password)
    db_user = models.UserDB(
       username = user.username,
       firstname = user.firstname,
        lastname=user.lastname,
        email = user.email,
        password_hash= password_hash,
        is_active = user.is_active,
        is_superuser = user.is_superuser,
        is_leader = user.is_leader, 
        companyname = user.companyname,
        cellphone = user.cellphone,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
def deleter_user(db:Session, id:int):
    user = get_user(db,id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(user)
    db.commit()
    return user




def edit_user(db:Session, id:int,user:schemas.EditUser) ->schemas.User:
    db_user = get_user(db,id)
    if not db_user:
        raise HTTPException(status.HTTP_404_NOT_FOUND,detail="User not found")
    update_data = user.dict(exclude_unset=True)
    # print("Update data =>>> " ,update_data)     
    if "password" in update_data:
        update_data["password_hash"] = get_password_hash(user.password)
        del update_data["password"]
    for key, value in update_data.items():
        setattr(db_user,key,value)

    print("Update Data with hash",db_user)

    db.add(db_user)
    db.commit()
    #The refresh method could create IDLE transactions? 
    db.refresh(db_user)
    print("Here")
    return db_user

##Project CRUD operations 

def add_project_to_user(db:Session, project:schemas.ProjectSchema, user:schemas.User, user_project:schemas.User_TableSchema):
    # print("Here add_project")
    # print(project.users)
    user_project.user = user 
    print("Here add_project_user===>,", user_project.user)
    project.users = [user_project]
    db.add(project)
    db.commit()
    db.refresh(project)
    return project 


def create_project(db:Session, project: schemas.CreateProject) :
    print("Here==>>> before ")
    print(project.projectName, project.nameOfLeader, project.createdAtTime, project.description)
    db_project = models.ProjectDB(
       projectName= project.projectName,
       nameOfLeader= project.nameOfLeader,
       createdAtTime = project.createdAtTime,
       description = project.description,
    )

    print("Here After==>>>")
    print(db_project)
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_projects(db:Session, user:schemas.User,skip:int=0, limit: int =10 )  :

    projects = db.query(models.ProjectDB).join(models.User_Project).filter(models.User_Project.userId == user.id).offset(skip).limit(limit).all()
    # projects = db.query(models.ProjectDB).options(joinedload(models.ProjectDB.users)).where()
    # .filter(models.ProjectDB.users.any(userId == user.id)).offset(skip).limit(limit).all()
    db.commit()
    return projects 

