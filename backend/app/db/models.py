from sqlalchemy import Column, Boolean, ForeignKey, Integer, String, Table
from sqlalchemy.orm import (relationship)
from app.db.session import Base
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.types import DateTime , Float



#Ingredient - Item Relationship Many to Many
class RecipeDB(Base):
    __tablename__ = "Recipe"
    ingredientId= Column(ForeignKey("Ingredient.ingredientId"), primary_key=True)
    itemId= Column(ForeignKey("Item.itemId",ondelete="CASCADE"), primary_key=True)

    quantity = Column(Float,nullable=False)
    unit = Column(String,nullable=False)
    instructions= Column(String)
    item= relationship("ItemDB",back_populates="ingredients")
    ingredient= relationship("IngredientDB",back_populates="items")

#User-Project Realationship Many-to-Many
class User_Project(Base):
    __tablename__ = "User_Project"
    userId= Column(ForeignKey("User.id"), primary_key=True)
    projectId= Column(ForeignKey("Project.projectId"), primary_key=True)
    extraData= Column(String)
    user= relationship("UserDB",back_populates="projects")
    project= relationship("ProjectDB",back_populates="users")


class UserDB(Base):
    __tablename__ = "User"
    # __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, nullable=False, index=True, unique=True)
    password_hash = Column(String, nullable=False)
    cellphone = Column(Integer)
    companyname = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    is_leader = Column(Boolean, default=False)
    projects = relationship("User_Project",back_populates="user")

    def __repr__(self):
        return f"<UserId :{self.id}, username: {self.username}>"

class ProjectDB(Base):
    __tablename__ = "Project"
    projectId= Column(Integer, primary_key=True, index=True)
    projectName = Column(String, nullable=False)
    nameOfLeader = Column(String)
    description = Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    users= relationship("User_Project",back_populates="project", cascade="all,delete")
    ingredients = relationship("IngredientDB",back_populates="project", cascade="all,delete")
    items= relationship("ItemDB",back_populates="project", cascade="all,delete")

    def __repr__(self):
        return f"<ProjectId:{self.projectId}, projectname: {self.projectName}>"

class IngredientDB(Base):
    __tablename__ = "Ingredient"
    ingredientId= Column(Integer, primary_key=True, index=True,autoincrement=True)
    nameIngredient= Column(String, nullable=False)
    quantity = Column(Integer)
    unit = Column(String)
    summary= Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    image_url = Column(String)
    projectId = Column(ForeignKey("Project.projectId")) 
    project = relationship("ProjectDB", back_populates="ingredients")
    items= relationship("RecipeDB",back_populates="ingredient", cascade="all,delete")


    # items= relationship("RecipeDB",back_populates="ingredient", cascade="all,delete")

    def __repr__(self):
        return f"<IngredientId:{self.ingredientId}, ingredientName: {self.nameIngredient}>"
    

class ItemDB(Base):
    __tablename__ = "Item"
    itemId= Column(Integer, primary_key=True, index=True,autoincrement=True)
    nameItem= Column(String, nullable=False)
    quantity = Column(Integer)
    unit = Column(String)
    type = Column(String)
    cooking = Column(Boolean)
    price = Column(Float,nullable=False)
    summary= Column(String)
    image_url = Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))

    #Project Foreign Key
    projectId = Column(ForeignKey("Project.projectId"))

    project = relationship("ProjectDB", back_populates="items")

    ingredients= relationship("RecipeDB",back_populates="item",cascade="all,delete")

    def __repr__(self):
        return f"<Item:{self.itemId}, itemName: {self.nameItem}>"
   

