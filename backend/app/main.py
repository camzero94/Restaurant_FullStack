from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from fastapi import Depends, FastAPI
from db.session import SessionLocal
from sqlalchemy.orm import Session, joinedload
from db.session import get_db
import uvicorn
from api.routers.auth import auth_router
from api.routers.users import user_router
from api.routers.projects import project_router
from api.routers.ingredients import ingredient_router 
from api.routers.items import item_router
from core.auth import get_current_active_user
from app.db.server import create_project, add_project_to_user, get_user
from app.core.auth import get_current_active_leader, get_current_active_user


app = FastAPI(docs_url="/api/docs", openapi_url="/api")

origins = [
    "http://localhost:3000",
    "http://localhost:3000/api",
    "http://localhost:3000/api/v1",
    "http://localhost:19000"
    "http://10.0.2.2:19000"
    "http://192.168.0.4:19000"

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.middleware("http")


async def db_session_middleware(request: Request, call_next):
    request.state.db = SessionLocal()
    response = await call_next(request)
    request.state.db.close()
    return response


@app.get("/{id}")
def get_by_id(id: int, db: Session = Depends(get_db)):

    print("here", id)
    user1 = get_user(db, id)
    return user1.email


@app.get("/api/v1")
async def root():
    return {"message": "Hello World"}


# Routers
app.include_router(
    user_router,
    prefix="/api/v1",
    tags=["users"],
    dependencies=[Depends(get_current_active_user)],
)

app.include_router(
    project_router,
    prefix="/api/v1",
    tags=["projects"],
    dependencies=[Depends(get_current_active_user)],
)

app.include_router(
    item_router,
    prefix="/api/v1",
    tags=["items"],
    dependencies=[Depends(get_current_active_user)],
)
app.include_router(
    ingredient_router,
    prefix="/api/v1",
    tags=["ingredients"],
    dependencies=[Depends(get_current_active_user)],
)

app.include_router(auth_router, prefix="/api", tags=["auth"])

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
