
#!/usr/bin/env python3

from app.db.session import get_db
from app.db.server import create_user, create_project, add_project_to_user,get_user, get_projects,get_project, create_ingredient, add_ingredient_project
from app.db.schemas.user_project_schemas import CreateProject,ProjectSchema, CreateUser,  User,CreateIngredient 
from app.db.session import SessionLocal
from datetime import datetime
from app.db.models import User_Project, ProjectDB
# from  pydantic import ValidationError

def init() -> None:
    
    db = SessionLocal()

    # user1 = get_user(db,1)
    project = get_project(db,2)
    
    # createdIngredient = create_ingredient(db,

    # CreateIngredient(
    #     nameIngredient =  "Tomato",
    #     quantity = 22,
    #     unit = "Kg",
    #     summary= "Yummy",
    #     createdAtTime = datetime.strptime('1/1/2009 4:50 AM', '%m/%d/%Y %I:%M %p'),
    #     projectId= project.projectId,
    # )
    #                                       )
    #
    # [project_with_ingredient,ingredient] = add_ingredient_project(db,project,createdIngredient)
    # print("INGREDIENT",ingredient)
    # print("Here is the list")
    # for ingredient in project.ingredients:
    #     print(ingredient.ingredientId)
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
