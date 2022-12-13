
from fastapi import APIRouter, Request, Depends, Response 
from app.db.schemas.user_project_schemas import CreateMenu, MenuSchema
from app.db.session import get_db
from app.db.server import (
    get_project,
    create_menu,
    get_list_items_by_name,
    add_items_menu,
    get_menus,
    menu_delete,
)
from app.core.auth import get_current_active_leader, get_current_active_user
from app.db.models import ItemDB 
import typing as t


menu_router = re = APIRouter()

# CRUD operations for Ingredients


@re.post("/menus/{projectId}", response_model_exclude_none=True)
async def item_create(
    request: Request,
    projectId: int,
    menu: CreateMenu,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    print("Here Is the project Id   ===>", projectId)
    print("Here Is the Menu ===>", menu)

    """
    Create a new Menu 
    """
    # Get Current Project
    currentProject = get_project(db, projectId)

    # Create Item
    createMenu= create_menu(db, menu, projectId)

    # Query Ingredients of Item List and Update  ingredients
    itemsList = get_list_items_by_name(db,menu)

    # Create Recipes Table
    menuWithItems= add_items_menu(db, menu,createMenu,itemsList)

    print(menuWithItems)

    return menuWithItems 


@re.get("/menus/{project_id}", response_model_exclude_none=True)
async def item_List(
    response: Response,
    project_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    
    menus = get_menus(db,project_id)
    response.headers["Content-Range"] = f"0-9/{len(menus)}"
    response.headers["Access-Control-Expose-Headers"] = "Content-Range"
    return menus 


@re.delete("/menu/{menu_id}", response_model_exclude_none=True)
async def delete_item(
    request: Request,
    menu_id: int,
    db=Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    #Delete Item
    print("=================DELETE===============")
    res = menu_delete(db,menu_id)
    return res 
# @re.put("/items/{item_id}", response_model_exclude_none=True)
# async def edit_item(
#     request: Request,
#     item_id: int,
#     item_req:ItemSchema,
#     db=Depends(get_db),
#     current_user=Depends(get_current_active_user),
# ):
#     # Edit the item, add new ingredient or Delete ingredient
#     item= get_list_ingredients(db, item_req,item_id)
#     # edited_item = item_edit(db,item_id,item_req,ingredientList)
#     # print(edited_item)
#
#     return item
#
