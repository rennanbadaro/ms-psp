### Requirements
NodeJS 10.16 </br>
*Recomended: nvm* </br>
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

npm run start:dotenv
npm run migrations
```

## Development
### Folder Structure
```
.
+-- README.md
+-- app.js
+-- src
|    +-- config
|    |    +-- db
|    +-- domains
|    |    +-- transactions
|    |    +-- payables
+-- tests
|    +-- functional
|    |    +-- domains
|    +-- unit
|    |    +-- domains
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