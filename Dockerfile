# Use uma imagem base oficial do Node.js
FROM node:20

# Cria e define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Define a variável de ambiente NODE_ENV, pode ser passado via Docker Compose ou durante o build
ARG NODE_ENV=dev
ENV NODE_ENV=$NODE_ENV

# Copia o package.json e package-lock.json (ou yarn.lock) para o contêiner
COPY package*.json ./

# Instala todas as dependências (incluindo as de dev)
RUN npm install --force

# Instala as dependências do TypeScript
RUN npm install -g typescript ts-node --force

# Copia o arquivo .env para o contêiner
COPY .env ./.env

# Copia todo o código-fonte para o contêiner
COPY . .

# Expõe a porta que o app vai rodar
EXPOSE 3000

# Comando para rodar o NestJS em modo de desenvolvimento (com hot reload)
CMD ["npm", "run", "start:dev"]