# /backend/Dockerfile (Estágio 1: BUILDER)
FROM node:20 AS builder 

WORKDIR /app


# Instalação de dependências
COPY backend/package.json backend/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia código e compila
COPY backend/ .
# O BUILD ESTÁ AQUI. Se ele falhar, /app/dist não será criado.
RUN yarn run build 

# ----------------------------------------------------------------------
# ESTÁGIO 2: PRODUÇÃO (Imagem final)
# O segundo estágio deve referenciar o estágio anterior pelo nome
FROM node:20 

WORKDIR /app

# Ele agora encontrará o estágio "builder" definido acima
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3001
CMD [ "node", "dist/main.js" ]