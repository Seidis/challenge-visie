from db import Base, engine
from sqlalchemy import text

from models.pessoas import Pessoa


def create_all_tables():
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print("Database connection failed")
        raise e


def drop_all_tables():
    try:
        Base.metadata.drop_all(bind=engine)
    except Exception as e:
        print("Database connection failed")
        raise e
