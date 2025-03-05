# Projeto NEST

Este é um projeto desenvolvido com Nestjs,typeorm. Abaixo estão as instruções para configurar o ambiente e executar a aplicação localmente.

## Requisitos

Antes de começar, certifique-se de ter o seguinte instalado no seu sistema:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **NEST CLI** (ferramenta de linha de comando do Angular)

### Verifique se o Node.js e npm estão instalados:

```bash
node -v
npm -v
```

# Primeiro, clone o repositório para o seu computador:

```bash
git clone https://github.com/thiagohc20/technology_solutions_backend.git

npm i @nestjs/cli
```

# execute o comando

```bash
docker-compose up --build
```

# Caso a imagem do backend nao execute, mude a env para DB_HOST:localhost

```bash
npm i
```

# docker-compose up -d

```bash
docker-compose up -d
```

# Logo após

```bash
npm run start:dev
```
