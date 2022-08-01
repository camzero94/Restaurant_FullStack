from fastapi import APIRouter, Request,Depends,Response
from app.db.schemas import Project, ProjectSchema
from app.db.schemas import CreateProject ,  User
from app.db.session import get_db
from app.db.server import create_project, add_project_to_user, get_projects
from app.core.auth import get_current_active_leader, get_current_active_user
from app.db.models import User_Project 
import typing as t


project_router = re = APIRouter()
#CRUD operations for project    

@re.post("/projects",response_model=ProjectSchema,response_model_exclude_none=True)
async def project_create(
    request: Request,
    project: CreateProject,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    print (project)
    """
    Create a new project
    """
    user_project = User_Project(extraData="My Data")
    created_project = create_project(db,project)
    project_with_user = add_project_to_user(db,created_project,current_user,user_project)
    
    
    return project_with_user

@re.get(
    "/projects",
    response_model=t.List[CreateProject],
    response_model_exclude_none=True,
)
async def project_list(
    response: Response,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get all users
    """
    projects = get_projects(db,current_user)
    # print(projects) 
    # for project in projects:
    #     print(project.projectId)
    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(projects)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return projects


