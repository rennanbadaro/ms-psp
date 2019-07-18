### Requirements
NodeJS 10.16 </br>
Docker

## Start
```bash
docker run \
  --name psp-postgres \
  -e POSTGRES_USER=super \
  -e POSTGRES_PASSWORD=super-secret \
  -e POSTGRES_DB=ms_psp \
  -p 5432:5432 \
  -d \
  postgres

npm run migrations
npm run start:dotenv
```

## Development
### Folder Structure Overview
```
.
+-- README.md
+-- index.js
+-- db
|    +-- migrations
|    +-- seeders
|    +-- config
+-- src
|    +-- app.js
|    +-- utils
|    +-- models
|    +-- domains
|    |    +-- customer
|    |    +-- transaction
|    |    +-- payable

```
### Tests

Run tests
```bash
npm test
```

Run tests in watch mode
```bash
npm run test:watch
```


### Migrations

Create a migration:
```bash
npm run migrations:create [migration-name]
```

Run migrations and seeds:
```bash
npm run migrations
```

Undo last migration:
```bash
npm run migrations:down
```

Undo all migration:
```bash
npm run migrations:down-all
```
