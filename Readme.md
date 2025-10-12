<h1>Sistema de Movimentação de Caixa</h1><br>

<h2>🎯 Sobre o Projeto</h2>

Este é um sistema Fullstack para gestão de movimentações de caixa, permitindo que o usuário visualize, registre e categorize entradas e saídas financeiras.

<h2>💻 Tecnologias</h2>

| Módulo | Tecnologia Principal	 | Framework/Runtime |
|---|---|---|
| Backend (API) | TypeScript | NestJS (Node.js) |
| Frontend (Client) | JavaScript/TypeScript | React |
| Orquestração | Contêineres | Docker/Docker Compose |
| Banco de Dados | PostgreSQL | Versão |


## 🚀 Como Executar o Projeto

Siga estes passos para ter a aplicação rodando em seu ambiente de desenvolvimento.

### Pré-requisitos

Certifique-se de ter instalado:
* **Docker Desktop** (Com Docker Compose v2)
* **Git**

### 1. Clonar o Repositório


git clone https://github.com/12-Bits/sistema-movimentacao-caixa.git
cd sistema-caixa-fullstack

### 2. Iniciar os Conteiners

docker compose up --build

### 3. Acessar a Aplicação
Aguarde até que os logs do terminal mostrem que a API e o Frontend foram iniciados:

<b>Frontend (React/Vite):</b> Abra seu navegador em http://localhost:5173

<b>Backend (NestJS API):</b> A API estará acessível em http://localhost:3000 (o endpoint inicial do módulo é, geralmente, /cashflow).