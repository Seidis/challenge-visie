from sqlalchemy import Column, Integer, String, Date

from db import Base


class Pessoa(Base):
    __tablename__ = "pessoas"

    id_pessoa = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    rg = Column(String(100), nullable=False, unique=True)
    cpf = Column(String(100), nullable=False, unique=True)
    data_nascimento = Column(Date, nullable=False)
    data_admissao = Column(Date, nullable=False)
    funcao = Column(String(100), nullable=True)
