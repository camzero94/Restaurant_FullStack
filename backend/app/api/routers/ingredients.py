from fastapi import APIRouter, Request, Depends, Response
from app.db.schemas.user_project_schemas import (
    IngredientSchema,
    CreateIngredient,
    Ingredient,
    UpdateIngredient,
)
from app.db.session import get_db
from app.db.server import (
    create_ingredient,
    get_project,
    add_ingredient_project,
    get_ingredients,
    edit_ingredient_by_id,
    delete_ingredient,
)
from app.core.auth import get_current_active_leader, get_current_active_user
from app.db.models import IngredientDB
import typing as t


ingredient_router = re = APIRouter()

# CRUD operations for Ingredients


@re.post(
    "/ingredients/{projectId}", response_model=IngredientSchema, response_model_exclude_none=True
)
async def ingredient_create(
    request: Request,
    projectId: int,
    ingredient: CreateIngredient,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Create a new ingredient
    """
    currentProject = get_project(db, projectId)

    createdIngredient = create_ingredient(db, ingredient, projectId)

    [project_ingredient, ingredient_with_project] = add_ingredient_project(
        db, currentProject, createdIngredient
    )

    # print(project_ingredient)
    # # for ingredient in project_ingredient.ingredients:
    #     print(ingredient)
    print(ingredient_with_project.items)

    return ingredient_with_project


@re.get(
    "/ingredients/{projectId}",
    # response_model=t.List[IngredientSchema],
    response_model_exclude_none=True,
)
async def ingredient_list(
    response: Response,
    projectId: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Get all Ingredients
    """
    ingredients = get_ingredients(db, projectId)
    # This is necessary for react-admin to work
    response.headers["Content-Range"] = f"0-9/{len(ingredients)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return ingredients


@re.put(
    "/ingredients/{ingredient_id}",
    # response_model=t.List[IngredientSchema],
    response_model_exclude_none=True,
)
async def ingredient_edit(
    response: Response,
    ingredient: UpdateIngredient,
    ingredient_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    """
    Edit Ingredient
    """
    edited_ingredient = edit_ingredient_by_id(db,ingredient,ingredient_id) 

    return edited_ingredient 


@re.delete(
    "/ingredient/{ingredient_id}",
    # response_model=ItemSchema,
    response_model_exclude_none=True,
)
async def ingredient_delete(
    response: Response,
    ingredient_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    deleted_ingredient = delete_ingredient(db, ingredient_id)
    db.commit()

    return delete_ingredient
