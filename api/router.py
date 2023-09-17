from fastapi import APIRouter

from routes.pessoas import router as pessoas_router

router = APIRouter()

router.include_router(pessoas_router, tags=["pessoas"], prefix="/pessoas")
