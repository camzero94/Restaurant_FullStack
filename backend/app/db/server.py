from fastapi import HTTPException,status
from sqlalchemy.orm import Session,joinedload
import typing as t
from app.db import models
from app.db.schemas import  user_project_schemas
from app.core.security import get_password_hash
from pydantic import ValidationError



def get_user(db:Session, id:int):
    user = db.query(models.UserDB).filter(models.UserDB.id == id).first()
    print(user)
    db.commit()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_user_by_email(db:Session, email:str) ->user_project_schemas.User:
    user = db.query(models.UserDB).filter(models.UserDB.email == email).first()
    db.commit()
    return user

def get_users(db:Session, skip:int=0, limit: int =100):
    users = db.query(models.UserDB).offset(skip).limit(limit).all()
    db.rollback()

    return users

def create_user(db:Session, user:user_project_schemas.CreateUser):
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




def edit_user(db:Session, id:int,user:user_project_schemas.EditUser) ->user_project_schemas.User:
    db_user = get_user(db,id)
    if not db_user:
        raise HTTPException(status.HTTP_404_NOT_FOUND,detail="User not found")
    update_data = user.dict(exclude_unset=True)

    if "password" in update_data:
        update_data["password_hash"] = get_password_hash(user.password)
        del update_data["password"]
    for key, value in update_data.items():
        setattr(db_user,key,value)


    db.add(db_user)
    db.commit()

    db.refresh(db_user)
    print("Here")
    return db_user

##Project CRUD operations 

def get_project(db:Session, project_id:int):
    project = db.query(models.ProjectDB).filter(models.ProjectDB.projectId == project_id ).first()
    if not project:
        raise HTTPException(status_code=404,detail="Project not found")
    return project

def add_project_to_user(db:Session, project:user_project_schemas.ProjectSchema, user:user_project_schemas.User, user_project:user_project_schemas.User_TableSchema):
    # print("Here add_project")
    # print(project.users)
    user_project.user = user 
    print("Here add_project_user===>,", user_project.user)
    project.users = [user_project]
    db.add(project)
    db.commit()
    db.refresh(project)
    return project 


def create_project(db:Session, project: user_project_schemas.CreateProject) :
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

def get_projects(db:Session, user:user_project_schemas.User,skip:int=0, limit: int =10 )  :

    projects = db.query(models.ProjectDB).join(models.User_Project).filter(models.User_Project.userId == user.id).offset(skip).limit(limit).all()
    return projects 


def delete_project(db:Session, project_id:int):
    project = get_project(db,project_id)
    delete_project = db.delete(project)
    db.commit()
    return project

##Helper Functions Ingredients  Get_ingredients, CreateIngredients , Add_Ingredient_to_Projects

def get_ingredient(db:Session,ingredient_id:int):
    ingredient = db.query(models.IngredientDB).filter(models.IngredientDB.ingredientId == ingredient_id).first()
    if not ingredient:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    return ingredient

def get_ingredients(db:Session, projectId:int,skip:int=0, limit: int =10 ) -> t.List[user_project_schemas.IngredientSchema] :
    ingredients = db.query(models.IngredientDB).filter(models.IngredientDB.projectId== projectId).offset(skip).limit(limit).all()
    
    return ingredients 
def edit_ingredient_by_id(db:Session,ingredient_to_edit:user_project_schemas.UpdateIngredient,ingredient_id:int ):

    ingredient_db = get_ingredient(db,ingredient_id) 
    print("HERE======")
    if not ingredient_db:
        raise HTTPException(status.HTTP_404_NOT_FOUND,detail="Ingredient not found")

    update_data = ingredient_to_edit.dict(exclude_unset=True)
    print(update_data)

    for key, value in update_data.items():
        setattr(ingredient_db,key,value)

    db.add(ingredient_db)
    db.commit()
    db.refresh(ingredient_db)

    return ingredient_db
    

def create_ingredient(db:Session,ingredient:user_project_schemas.CreateIngredient, projectIdreq:int):
    print("Here =====>Ingredient")
    
    db_ingredient = models.IngredientDB(
        nameIngredient = ingredient.nameIngredient,
        quantity = ingredient.quantity,
        unit = ingredient.unit,
        summary= ingredient.summary,
        image_url = ingredient.image_url,
        createdAtTime = ingredient.createdAtTime,
        projectId = projectIdreq,

    ) 

    db.add(db_ingredient)
    db.commit()
    db.refresh(db_ingredient)
    return db_ingredient

def add_ingredient_project(db:Session, project:user_project_schemas.ProjectSchema, ingredient:user_project_schemas.IngredientSchema):
    print("Here add ingredient ===>") 
    project.ingredients.append(ingredient)
    db.add(project)
    db.commit()
    db.refresh(project)
    return [project,ingredient]

def get_ingredientById(db:Session, ingredientId:int):
    ingredient= db.query(models.IngredientDB).filter(models.IngredientDB.ingredientId== ingredientId).first()
    print(ingredient)
    if not ingredient:
        raise HTTPException(status_code=404,detail="Project not found")
    return ingredient 

def delete_ingredient(db:Session, ingredient_id:int):
    ingredient= get_ingredientById(db,ingredient_id)
    delete_ingredient = db.delete(ingredient)
    db.commit()
    return ingredient 

#Get list Ingredients after updating them
def get_list_ingredients_by_name(db:Session,item:user_project_schemas.ItemSchema) :

    print("Here=======>>> START")

    # Extract ingredients from item recived from user
    ingredientsId= []
    ingredientsNameQty= []
    for ingredient in item.ingredients:
        ingredientsId.append(ingredient.ingredientId)
        ingredientsNameQty.append((ingredient.nameIngredient,ingredient.quantity))


    print("Here List Ingredients ======>>>>", ingredientsNameQty)
    # for x in ingredientsId:
    #     print(x)


    #Query the ingredient by Id extracted in  ingredientsId []
    ingredientsQuery = []
    for idIngredient in ingredientsId:
        ingredientsQuery.append( db.query(models.IngredientDB).filter(models.IngredientDB.ingredientId== idIngredient).first())
        db.commit()
    
    print("Here=======>>>", ingredientsQuery)
    for idx ,x  in enumerate (ingredientsQuery):
        print(f"Ingredient {idx} is: {x.nameIngredient} and quantity is: {x.quantity}")

    #Update Ingredients
    for ingredientQuery in ingredientsQuery:
        for ingredientNewName,ingredientNewQty in ingredientsNameQty:
            if ingredientQuery.nameIngredient == ingredientNewName:
                print("Name Equal")
                ingredientQuery.quantity -=ingredientNewQty

                db.add(ingredientQuery)
                db.commit()
                db.refresh(ingredientQuery) 


    
    for idx ,x  in enumerate (ingredientsQuery):
        print(f"Ingredient {idx} is: {x.nameIngredient} and quantity is: {x.quantity}")
        
    
    return ingredientsQuery 
    

#Items helper functions  

def get_item(db:Session,item_id:int) ->user_project_schemas.ItemSchema:
    item = db.query(models.ItemDB).options(joinedload(models.ItemDB.ingredients)).filter(models.ItemDB.itemId == item_id).first()
    if not item:
        raise HTTPException(
                status_code=404,
                detail="Item not found",
            )
    return item
def get_item_no_ingredients(db:Session,item_id:int):
    item = db.query(models.ItemDB).filter(models.ItemDB.itemId == item_id).first()
    return item

def get_items(db:Session, projectId:int,skip=0,limit=10):
    items= db.query(models.ItemDB).options(joinedload(models.ItemDB.ingredients).joinedload(models.RecipeDB.ingredient)).filter(models.ItemDB.projectId== projectId).offset(skip).limit(limit).all()
    return items

def create_item(db:Session,item:user_project_schemas.ItemSchema, projectIdreq:int) -> user_project_schemas.ItemSchema:
    print("Here =====>Item")
    db_item= models.ItemDB(
        nameItem= item.nameItem,
        price = item.price,
        type = item.type,
        cooking = item.cooking,
        quantity = item.quantity,
        unit = item.unit,
        summary= item.summary,
        image_url = item.image_url,
        createdAtTime = item.createdAtTime,
        projectId = projectIdreq,
    ) 
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def add_ingredients_item(db:Session, item:user_project_schemas.ItemSchema,createdItem:user_project_schemas.ItemSchema, ingredientList):
    print("Create Recipe")

    db_recipes = []
    
    for idx,ingredient in enumerate(item.ingredients):
        db_recipe = models.RecipeDB(
        quantity =ingredient.quantity,
        unit = ingredient.unit,
        instructions = item.summary,
        )
        db_recipes.append(db_recipe)
        db_recipe.ingredient = ingredientList[idx]
        createdItem.ingredients.append(db_recipe)
        db.add(createdItem)
        db.commit()

    
    return createdItem 


def item_edit(db:Session, itemId:int,item_edit:user_project_schemas.ItemSchema , ingredientList):

    #Get Item from Database 
    itemDB = get_item(db,itemId)

    #If ADD update ingredients array
    if item_edit.add == True :
        print("Enter Here ")

        ingredientsItemEdit = []
        ingredientsItemEditUnit =[] 
        for ingredientEdit in item_edit.ingredients:
            ingredientsItemEdit.append((ingredientEdit.nameIngredient,ingredientEdit.quantity))
            ingredientsItemEditUnit.append(ingredientEdit.unit)

        len_item_ingredients_DB  = len(itemDB.ingredients)
        len_item_ingredients_edit = len(item_edit.ingredients)

        print("ItemDB==>",len_item_ingredients_DB,"ItemEdit",len_item_ingredients_edit)
        
        db_recipes =[]
        print(len(item_edit.ingredients))
        for idx,ingredient in enumerate(item_edit.ingredients,start=len_item_ingredients_DB):
                if idx == len_item_ingredients_edit:
                    break
                else:
                    db_recipe = models.RecipeDB(
                    quantity = item_edit.ingredients[idx].quantity,
                    unit =  item_edit.ingredients[idx].unit,
                    instructions = item_edit.summary,
                    )
                    print(f'The index : {idx}, the ingredient: {item_edit.ingredients[idx].nameIngredient}')
                    db_recipes.append(db_recipe)
                    db_recipe.ingredient = ingredientList[idx]
                    itemDB.ingredients.append(db_recipe)
                    db.add(itemDB)
                    db.commit()

    if item_edit.edit_flag == True:
        item_db= get_item(db,itemId) 

        print("HERE======")
        if not item_db:
            raise HTTPException(status.HTTP_404_NOT_FOUND,detail="Item not found")

        update_data = item_edit.dict(exclude_unset=True)
        print(update_data)

        for key, value in update_data.items():
            print(key,value)
            if(key == 'ingredients'):
                break 
            setattr(item_db,key,value)
                
        db.add(item_db)
        db.commit()
        db.refresh(item_db)

        
    return itemDB 

def item_delete(db:Session, itemId:int):

    print("====================DELETE Here========================")
    item = get_item_no_ingredients(db,itemId)
    if not item:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Item not found")
    db.delete(item)
    db.commit()
    return "Successfully Deleted"

def get_list_ingredients(db:Session,item:user_project_schemas.ItemSchema,itemID:int) :

    print("Enter update list =================== ")
    itemDB = get_item(db,itemID)

    len_item_query = len(item.ingredients)
    len_itemDB = len(itemDB.ingredients)

    # Extract ingredients from item recived from user
    ingredientsId= []
    ingredientsNameQty= []
    for ingredient in item.ingredients:
        ingredientsId.append(ingredient.ingredientId)
        ingredientsNameQty.append((ingredient.nameIngredient,ingredient.quantity))

    #Query the ingredient by Id extracted in  ingredientsId []
    ingredientsQuery = []
    for idIngredient in ingredientsId:
        ingredientsQuery.append( db.query(models.IngredientDB).filter(models.IngredientDB.ingredientId== idIngredient).first())
        db.commit()
    
    for idx ,x  in enumerate (ingredientsQuery):
        print(f"Ingredient {idx} is: {x.nameIngredient} and quantity is: {x.quantity}")
    print("Ingredients Req",len_item_query)
    print("Ingredients Item DB",len_itemDB)
    # for idx ,x  in enumerate (itemDB.ingredients):
    #     print(f"Ingredient {idx} is: {x.nameIngredient} and quantity is: {x.quantity}")
    
    #If the len of both arrays are the same then we should update  and same id


    if item.edit_flag:
        
        item_req_dict = item.dict(exclude_unset=True)
        # itemDB_dict = itemDB.dict(exlcude_unset=True)
        for key,val in item_req_dict.items():
            if (key == 'nameItem' or key == 'type'or key == 'cooking' 
                or key == 'price' or key == 'image_url' or key == 'updatedAtTime'
                or key == 'unit' or key == 'summary'):
                setattr(itemDB,key,val)

        # db.add(itemDB)
        # db.commit()
        # db.refresh(itemDB)
        for ingredientsItemDB in itemDB.ingredients:
            for ingredient in item_req_dict['ingredients']:
                if ingredient['ingredientId']  == ingredientsItemDB.ingredientId:
                    print("Name Equal")
                    ingredientsItemDB.quantity= ingredient['quantity'] 
                    # print(f'Ingredient name :{ingredientQuery.nameIngredient} , ingredient quantity: {ingredientQuery.quantity}')
                    db.add(itemDB)
                    db.commit()
                    db.refresh(itemDB)

    if len_item_query > len_itemDB and item.add :
    #If the len of both arrays are not the same then we should add
        for idx,ingredientQuery in enumerate(ingredientsQuery,start=len_itemDB):

            if idx == len(ingredientsQuery):
                break
            else:
                [ingredientNewName,ingredientNewQty] =  ingredientsNameQty[idx]
                # print(f'Index is:{idx}, and Im at what ingredient {ingredientNewName}, and with qty {ingredientNewQty}')
                # print(f'Index is:{idx}, and Im at what ingredient {ingredientsQuery[idx].nameIngredient}, and with qty {ingredientsQuery[idx].quantity}')
                if ingredientsQuery[idx].nameIngredient == ingredientNewName:
                    # print("Name Equal")
                    # print("Quantity Before",ingredientsQuery[idx].quantity)
                    ingredientsQuery[idx].quantity -=ingredientNewQty
                    # print("Quantity After",ingredientsQuery[idx].quantity)

                    db.add(ingredientsQuery[idx])
                    db.commit()
                    db.refresh(ingredientsQuery[idx])

    
    for idx ,x  in enumerate (ingredientsQuery):
        print(f"Ingredient {idx} is: {x.nameIngredient} and quantity is: {x.quantity}")
        
    return itemDB 


# Menu helper functions 

def create_menu(db:Session,menu:user_project_schemas.MenuSchema, projectIdreq:int) -> user_project_schemas.MenuSchema:
    print("Here =====>Item")
    db_menu= models.MenuDB(
        nameMenu= menu.nameMenu,
        description = menu.description,
        type = menu.type,
        summary= menu.summary,
        image_url = menu.image_url,
        createdAtTime = menu.createdAtTime,
        projectId = projectIdreq,
    ) 
    db.add(db_menu)
    db.commit()
    db.refresh(db_menu)
    return db_menu 

def get_list_items_by_name(db:Session, menu:user_project_schemas.MenuSchema):       

    print("Here=======>>> START GET LIST IEMS BY NAME")

    # Extract ingredients from item recived from user
    itemsId_Name= []
    for item in menu.items:
        itemsId_Name.append((item.itemId,item.nameItem))


    print("Here List Items ======>>>>", itemsId_Name)

    #Query the item by Id extracted in  itemsId[]
    itemsQuery = []
    for item in itemsId_Name:
        itemsQuery.append( db.query(models.ItemDB).filter(models.ItemDB.itemId== item[0]).first())
        db.commit()
    
    print("Here=======>>>", itemsQuery)
    for idx ,x  in enumerate (itemsQuery):
        print(f"Item {idx} is Id  : {x.itemId} and name is: {x.nameItem}")

    return itemsQuery


def add_items_menu(db:Session, menu:user_project_schemas.CreateMenu,createdMenu:user_project_schemas.CreateMenu, itemsList):
    print("Create Menu_Items")
    print(f'This is the created Menu: {createdMenu}, and this is the req menu: {menu}')
    db_menuItems= []
    
    for idx,item in enumerate(menu.items):

        db_menuItem = models.MenuItem()
        db_menuItems.append(db_menuItem)
        # print(f'The idx is: {idx}, the item is {itemsList[idx].nameItem}')
        db_menuItem.item = itemsList[idx]
        createdMenu.items.append(db_menuItem)
        db.add(createdMenu)
        db.commit()
    
    return createdMenu 

def get_menus(db:Session, projectId:int,skip=0,limit=10):
    menus= db.query(models.MenuDB).options(joinedload(models.MenuDB.items).joinedload(models.MenuItem.item)).filter(models.MenuDB.projectId== projectId).offset(skip).limit(limit).all()
    return menus 

def get_menu_no_ingredients(db:Session,menu_id:int):
    menu = db.query(models.MenuDB).filter(models.MenuDB.menuId== menu_id).first()
    return menu 

def menu_delete(db:Session, menuId:int):

    print("====================DELETE Here========================")
    menu= get_menu_no_ingredients(db,menuId)
    if not menu:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Menu not found")
    db.delete(menu)
    db.commit()
    return "Successfully Menu Deleted"
