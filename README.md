# Challenge Visie

## Instalação

O projeto utiliza o Docker para gerenciar suas aplicações, então é bem simples de executar:

1. Com o Docker Engine executando, abra o terminal e execute o comando: `docker-compose up`

Caso queira executar as aplicações sem o Docker, utilize o seguinte tutorial:

1. Para a api:

   1. Acesse a pasta api: `cd api`
   2. Crie um ambiente virtual: `python3 -m venv venv`
   3. Ative o ambiente virtual: `source venv/bin/activate`
   4. Instale as dependências do backend: `pip3 install -r requirements.txt`
   5. Execute o arquivo: `python development.py`

2. Para o frontend:

   1. Acesse a pasta frontend: `cd frontend`
   2. Instale as dependências do frontend: `npm install`
   3. Inicie o servidor local: `npm run dev`
