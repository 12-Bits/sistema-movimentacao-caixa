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

<h2>Como Rodar o Projeto</h2>
Como o projeto utiliza Docker Compose, a inicialização é feita com um único comando.

<h2>📋 Pré-requisitos</h2>
Para rodar o projeto localmente, você precisa ter o Docker e o Docker Compose instalados em sua máquina.

Instalar Docker Desktop

🛠️ Instalação e Inicialização
Siga os passos abaixo no seu terminal:

<h3>Clone o Repositório:</h3>

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio


<h3>Copiar Arquivos de Variáveis de Ambiente:</h3>

cp .env.example .env


<h3>Construa e Inicie os Contêineres:</h3>
Este comando irá construir as imagens do Backend (sistema-api) e do Frontend (sistema-client), criar a rede e subir todos os serviços definidos no docker-compose.yml.

docker compose up --build -d
(A flag -d executa em segundo plano, mas você pode removê-la para ver os logs de inicialização)

<h3>Verifique os Logs (Opcional):</h3>
Para garantir que os serviços subiram sem erros (e para verificar o status do erro atual da API):

docker compose logs -f

<h2>🌍 Acessando a Aplicação</h2>
Depois que os contêineres estiverem em execução, você pode acessar os serviços:

| Serviço | Porta Externa | URL de Acesso |
|---|---|---|
| Frontend (Cliente) | 80 (Padrão Nginx) | http://localhost |
| Backend (API) | 3001 (Exemplo) | http://localhost:3001 |

