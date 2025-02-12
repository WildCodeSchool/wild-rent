# Project Initialization

## Backend
1. TypeORM
```bash
npm init
npm install typeorm --save
```

2. ApolloServer
```bash
npm pkg set type="module" 
npm install @apollo/server graphq
```

3. Compileur Typescript
```bash
npm install ts-node-dev
```

4. GraphQL
```bash
npm install --save graphql
```

5. Decorateur
```bash
npm install reflect-metadata
```

6. CORS
```bash
npm install cors
```

7. Dotenv 
```bash
npm install dotenv
```

### Dockerfile

```docker
FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY src src
COPY tsconfig.json tsconfig.json

CMD npm start
```

## Frontend

Récupérer le fichier ts.node.dev de la doc (ou repo existant)


## Arborescence


```bash

root
├── backend
│   ├── node_modules
│   ├── src
│   │   ├── config
│   │   ├── entities
│   │   ├── resolvers
│   ├── docker-compose.yaml
│   ├── nginx.conf
│   ├── .gitignore
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── .env.example
├── frontend
├── package-lock.json
├── package.json
├── Dockerfile
├── index.ts
├── .env
├── .gitignore







```
