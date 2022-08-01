from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core import config
engine = create_engine(config.SQLALCHEMY_DATABASE_URI )

SessionLocal = sessionmaker( autocommit=False,autoflush=False, bind=engine)
Base = declarative_base()

#Create a function to retrieve a database session, 
# so it can be imported in other files to use the session
def get_db():
	db = SessionLocal()
	try:
		yield db
	except:
		db.close()

get_db()