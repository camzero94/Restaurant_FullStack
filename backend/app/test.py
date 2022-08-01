
#!/usr/bin/env python3

from app.db.session import get_db
from app.db.server import create_user, create_project, add_project_to_user,get_user, get_projects
from app.db.schemas import CreateUser, CreateProject,ProjectSchema, User
from app.db.session import SessionLocal
from datetime import datetime
from app.db.models import User_Project, ProjectDB
from  pydantic import ValidationError

def init() -> None:
    
    db = SessionLocal()

    user1 = get_user(db,1)
    projects = get_projects(db,user1)
    print(user1.email)
    print(projects) 
    for project in projects:
        print(project.projectId)


    # create_user(
    #     db,
    #     CreateUser(
    #         email="admin2@hotmail.com",
    #         password="1234",
    #         is_active=True,
    #         is_superuser=True,
    #         is_leader=False
    #     ),
    # )
    # create_project(
    #     db,
    #     CreateProject(
    #         projectName="projectOne",
    #         nameOfLeader="Camilo",
    #         createdAtTime=datetime.strptime('1/1/2009 4:50 AM', '%m/%d/%Y %I:%M %p')
    #     )
    # )


if __name__ == "__main__":
    print("Creating superuser {{cookiecutter.superuser_email}}")
    init()
    print("Superuser created")
