# 🚗 API de Carros

Este projeto é uma API RESTful construída com **Node.js + Express + TypeScript**, que permite gerenciar carros (listar, buscar por ID, buscar por tipo, criar, atualizar e deletar).  
A documentação interativa está disponível via **Swagger/OpenAPI**.

---

## 📌 Funcionalidades
- Listar todos os carros
- Buscar carro por **ID**
- Buscar carro por **tipo**
- Criar um novo carro
- Atualizar um carro por **ID**
- Deletar um carro por **ID**
- Documentação interativa com **Swagger**

---

## 🛠️ Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Swagger](https://swagger.io/)
- [Express Validator](https://express-validator.github.io/)

---

## 📂 Estrutura de Pastas
> .vscode
> dist
> docs
> node_modules
> src

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/fda145/BackendTypescript-DBCarro.git
cd nome-do-repo
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Rodar em modo desenvolvimento
```bash
npm run dev
```

### 4️⃣ Acessar a API
- API: [http://localhost:3000/carros](http://localhost:3000/carros)  
- Swagger Docs: [http://localhost:3000/docs](http://localhost:3000/docs)
- Para consultar um EndPont é necessário configurar a forma de acesso:
    - O projeto usa autorização tipo Basica
        . Username : master
        . Password : master%123
 - Para validar os EndPont's utilizar o software Postman
    - Importar o arquivo TSBackEnd-Carros.postman_colection.json
      Neste arquivo já estão configurados todas as rotas do projeto.
---

## 📖 Exemplo de Endpoints

### Listar carros
```http
GET /carros
```

### Buscar carro por ID
```http
GET /carros/1
```

### Criar carro
```http
POST /carros
Content-Type: application/json

{
  "nome": "Fusca",
  "descricao": "Carro clássico",
  "tipo": "Clássicos",
  "ativo": true
}
```

---

## 📜 Licença
Este projeto é distribuído sob a licença **MIT**.
