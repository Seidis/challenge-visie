from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db

from models.pessoas import Pessoa

from schemas.pessoas import PessoaBase, PessoaCreate, PessoaDetail, PessoaUpdate

router = APIRouter()


@router.get("/", response_model=List[PessoaBase])
async def get_pessoas(db: Session = Depends(get_db)):
    """
    Get all pessoas from database
    """
    return db.query(Pessoa).all()


@router.get("/{id_pessoa}", response_model=PessoaDetail)
async def get_pessoa(id_pessoa: int, db: Session = Depends(get_db)):
    """
    Get a single pessoa from database
    """
    pessoa = db.query(Pessoa).filter(Pessoa.id_pessoa == id_pessoa).first()
    if not pessoa:
        raise HTTPException(status_code=404, detail="Pessoa not found")
    return pessoa


@router.post("/")
async def create_pessoa(pessoa: PessoaCreate, db: Session = Depends(get_db)):
    """
    Create a new pessoa
    """
    db_pessoa = Pessoa(
        nome=pessoa.nome,
        data_admissao=pessoa.data_admissao,
        rg=pessoa.rg,
        cpf=pessoa.cpf,
        data_nascimento=pessoa.data_nascimento,
        funcao=pessoa.funcao,
    )
    db.add(db_pessoa)
    db.commit()
    db.refresh(db_pessoa)
    return "Pessoa created successfully"


@router.patch("/{id_pessoa}")
async def update_pessoa(
    id_pessoa: int, pessoa: PessoaUpdate, db: Session = Depends(get_db)
):
    """
    Update a pessoa
    """
    db_pessoa = db.query(Pessoa).filter(Pessoa.id_pessoa == id_pessoa)
    if not db_pessoa.first():
        raise HTTPException(status_code=404, detail="Pessoa not found")
    db_pessoa.update(pessoa.model_dump(exclude_unset=True))
    db.commit()
    return "Pessoa updated successfully"


@router.delete("/{id_pessoa}")
async def delete_pessoa(id_pessoa: int, db: Session = Depends(get_db)):
    """
    Delete a pessoa
    """
    db_pessoa = db.query(Pessoa).filter(Pessoa.id_pessoa == id_pessoa)
    if not db_pessoa.first():
        raise HTTPException(status_code=404, detail="Pessoa not found")
    db_pessoa.delete()
    db.commit()
    return "Pessoa deleted successfully"
