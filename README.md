# Missão Resgate Venezuela API

## Sobre o projeto

Este projeto é uma **API REST acadêmica** desenvolvida para a disciplina de Programação Web II. O objetivo é centralizar, de forma organizada e pesquisável, informações sobre pessoas desaparecidas após desastres naturais, permitindo o cadastro de pessoas, o registro de avistamentos e o cadastro de locais de apoio (abrigos, hospitais, centros de atendimento).

> ⚠️ **Projeto exclusivamente acadêmico.** Todos os dados utilizados (nomes, telefones, endereços, fotos) são **fictícios**. Não há qualquer relação com pessoas reais, vítimas reais ou dados reais de desaparecidos.

## Tecnologias utilizadas

- Node.js
- Express
- SQLite (via módulo nativo `node:sqlite` do Node.js — requer Node >= 22.13)
- Swagger UI Express / OpenAPI (documentação)
- dotenv

## Como executar

```bash
# 1. Instalar dependências
npm install

# 2. Criar o arquivo de variáveis de ambiente
cp .env.example .env

# 3. Popular o banco com dados fictícios (20 pessoas, 15 avistamentos, 10 locais de apoio)
npm run seed

# 4. Iniciar a API
npm start
# ou, em modo desenvolvimento (com reload automático):
npm run dev
```

A API sobe por padrão em `http://localhost:3000`.

## Configuração do banco de dados

O projeto usa **SQLite** via o módulo nativo `node:sqlite` do próprio Node.js, então não é necessário instalar um servidor de banco separado nem compilar dependências nativas. O arquivo do banco é criado automaticamente (com todas as tabelas) na primeira execução, no caminho definido pela variável `DATABASE_PATH`. Requer Node.js 22.13+ (o módulo ainda é considerado experimental pelo Node, mas totalmente funcional).

## Variáveis de ambiente (`.env`)

| Variável       | Descrição                                  | Exemplo                          |
|----------------|---------------------------------------------|-----------------------------------|
| `PORT`         | Porta em que a API roda                     | `3000`                            |
| `NODE_ENV`     | Ambiente de execução                        | `development`                     |
| `DATABASE_PATH`| Caminho do arquivo SQLite                   | `./database/missao_resgate.db`   |

## Rotas principais

| Método | Rota                                | Descrição                                      |
|--------|--------------------------------------|-------------------------------------------------|
| GET    | `/health`                            | Verifica se a API está online                   |
| POST   | `/api/pessoas`                       | Cadastra uma pessoa desaparecida                |
| GET    | `/api/pessoas`                       | Lista pessoas (paginação + filtros)             |
| GET    | `/api/pessoas/:id`                   | Busca uma pessoa por ID                         |
| PUT    | `/api/pessoas/:id`                   | Atualiza dados de uma pessoa                    |
| PATCH  | `/api/pessoas/:id/status`            | Atualiza apenas o status                        |
| DELETE | `/api/pessoas/:id`                   | Exclui um registro de pessoa                    |
| GET    | `/api/pessoas/:id/avistamentos`      | Histórico de avistamentos de uma pessoa         |
| POST   | `/api/avistamentos`                  | Registra um avistamento                         |
| GET    | `/api/avistamentos`                  | Lista avistamentos (paginação + filtro)         |
| POST   | `/api/locais-apoio`                  | Cadastra um local de apoio                      |
| GET    | `/api/locais-apoio`                  | Lista locais de apoio (paginação + filtro)      |
| GET    | `/api/locais-apoio/:id`              | Busca um local de apoio por ID                  |
| GET    | `/api/estatisticas`                  | Estatísticas gerais do sistema                  |

Filtros disponíveis em `GET /api/pessoas`: `nome`, `status`, `idade_min`, `idade_max`, `local_desaparecimento`, `data_de`, `data_ate`.

### Exemplo de paginação

`GET /api/pessoas?page=1&limit=10`

```json
{
  "pagina_atual": 1,
  "itens_por_pagina": 10,
  "total_registros": 20,
  "total_paginas": 2,
  "dados": []
}
```

### Exemplo de erro padronizado

```json
{
  "erro": "Pessoa não encontrada",
  "status": 404
}
```

## Documentação

A documentação completa (OpenAPI/Swagger) fica disponível, com a API rodando, em:

```
http://localhost:3000/docs
```

O arquivo-fonte está em `docs/openapi.yaml`.

## Coleção de testes

Uma coleção do Postman está disponível em `tests/missao-resgate-venezuela.postman_collection.json`. Basta importar no Postman/Insomnia e ajustar a variável `baseUrl` se necessário.

## Estrutura do projeto

```
missao-resgate-venezuela-api/
├── src/
│   ├── config/database.js
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/errorHandler.js
│   ├── validators/
│   ├── app.js
│   └── server.js
├── database/
│   └── seeds/seed.js
├── docs/openapi.yaml
├── tests/missao-resgate-venezuela.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Autor

Nome completo do aluno: _[preencher]_
