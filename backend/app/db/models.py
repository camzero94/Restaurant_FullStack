from sqlalchemy import Column, Boolean, ForeignKey, Integer, String, Table
from sqlalchemy.orm import (relationship)
from app.db.session import Base
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.types import DateTime , Float,TIMESTAMP

# Association_table=Table('Association_table',
#     Base.metadata,
#     Column( "userid",Integer,ForeignKey("User.id"), primary_key=True),
#     Column("projectId",Integer,ForeignKey("Project.projectId"), primary_key=True),
#     extend_existing=True,
# )
class User_Project(Base):
    __tablename__ = "User_Project"
    # __table_args__ = {"extend_existing": True}
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

    # def __repr__(self):
    #     return f"<UserId :{self.id}, username: {self.username}>"

class ProjectDB(Base):
    __tablename__ = "Project"
    # __table_args__ = {"extend_existing": True}
    projectId= Column(Integer, primary_key=True, index=True)
    projectName = Column(String, nullable=False)
    nameOfLeader = Column(String)
    description = Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    users= relationship("User_Project",back_populates="project")

    # def __repr__(self):
    #     return f"<ProjectId:{self.projectId}, projectname: {self.projectName}>"


# Base.metadata.create_all(engine)
# class Data(Base):
#     __tablename__ = "Data"
#     __table_args__ = {"extend_existing": True}
#     id = Column(Integer, primary_key=True, index=True)
#     projects = relationship(
#         "Project",
#         back_populates="data",
#         cascade="all, delete",
#         passive_deletes=True,
#     )
#     date = Column(DateTime)
#     store_nbr=Column(Integer)
#     family = Column(String)
#     sales = Column(Float)
#     onPromotion = Column(Integer)
#
#
#
