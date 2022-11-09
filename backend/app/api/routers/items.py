from fastapi import APIRouter, Request, Depends, Response 
from app.db.schemas.user_project_schemas import CreateItem, ItemSchema
from app.db.session import get_db
from app.db.server import (
    get_project,
    create_item,
    get_list_ingredients_by_name,
    get_list_ingredients,
    add_ingredients_item,
    get_items,
    item_edit,
    item_delete,

)
from app.core.auth import get_current_active_leader, get_current_active_user
from app.db.models import IngredientDB
import typing as t


item_router = re = APIRouter()

# CRUD operations for Ingredients


@re.post("/items/{projectId}", response_model_exclude_none=True)
async def item_create(
    request: Request,
    projectId: int,
    item: ItemSchema,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    print("Here Is the Item Id   ===>", projectId)
    print("Here Is the Item   ===>", item)

    """
    Create a new ingredient 
    """
    # Get Current Project
    currentProject = get_project(db, projectId)

    # Create Item
    createItem = create_item(db, item, projectId)

    # Query Ingredients of Item List and Update  ingredients
    ingredientsList = get_list_ingredients_by_name(db, item)

    # Create Recipes Table
    itemWithIngredients= add_ingredients_item(db, item,createItem,ingredientsList)

    print(createItem)

    return createItem


@re.get("/items/{project_id}", response_model_exclude_none=True)
async def item_List(
    response: Response,
    project_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    
    items = get_items(db,project_id)
    response.headers["Content-Range"] = f"0-9/{len(items)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return items 


@re.put("/items/{item_id}", response_model_exclude_none=True)
async def edit_item(
    request: Request,
    item_id: int,
    item_req:ItemSchema,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    # Edit the item, add new ingredient or Delete ingredient
    item= get_list_ingredients(db, item_req,item_id)
    # edited_item = item_edit(db,item_id,item_req,ingredientList)
    # print(edited_item)

    return item

@re.delete("/item/{item_id}", response_model_exclude_none=True)
async def delete_item(
    request: Request,
    item_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    #Delete Item
    print("=================DELETE===============")
    res=item_delete(db,item_id)
    return res 
