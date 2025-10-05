# ESTÁGIO 1: Build (A imagem "slim" é ideal)
FROM node:20 AS builder

WORKDIR /app


# Instalação de dependências
# Copia APENAS os arquivos de dependência
COPY frontend/package.json frontend/yarn.lock ./


# Use o Yarn para instalar
RUN yarn install --frozen-lockfile

# Copia o código-fonte restante
COPY frontend/ .

# Comando de build do React/Vite
RUN yarn run build 

# ----------------------------------------------------------------------

# ESTÁGIO 2: Produção (Servidor Nginx leve)
FROM nginx:alpine

# Copia os arquivos estáticos gerados na etapa de build
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]