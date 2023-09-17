import os
import db
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from router import router
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ["DATABASE_URL"]

app = FastAPI(
    title="Desafio da Visie",
    description="API para o desafio da Visie",
    version="0.1.0",
    docs_url="/",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_middleware(DBSessionMiddleware, db_url=DATABASE_URL)

app.include_router(router)
