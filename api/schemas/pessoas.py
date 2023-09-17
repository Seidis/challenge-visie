from datetime import date
from typing import Optional
from pydantic import BaseModel


class PessoaBase(BaseModel):
    id_pessoa: int
    nome: str
    data_admissao: date


class PessoaDetail(PessoaBase):
    rg: str
    cpf: str
    data_nascimento: date
    funcao: Optional[str]


class PessoaCreate(BaseModel):
    nome: str
    data_admissao: date
    rg: str
    cpf: str
    data_nascimento: date
    funcao: Optional[str] = None
    pass


class PessoaUpdate(BaseModel):
    nome: Optional[str] = None
    data_admissao: Optional[date] = None
    rg: Optional[str] = None
    cpf: Optional[str] = None
    data_nascimento: Optional[date] = None
    funcao: Optional[str] = None
    pass
