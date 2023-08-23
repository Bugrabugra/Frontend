### Packages
`npm i -D prisma@latest`

`npm i @prisma/client`

`npm i class-validator class-transformer`

`npm i bcrypt`

`npm i -D @types/bcrypt`

`npm i @nestjs/jwt passport-jwt`

`npm i -D @types/passport-jwt`

`npm i @nestjs/passport passport`

`npm i @nestjs/config`

### Commands

- `npx prisma init`

creates prisma files and folders

- `npx prisma migrate dev --create-only`

creates migration file at db

- `npx prisma db push`

creates tables from the migration file in db

- `npx prisma studio`

runs a web sql application

- `npx g resource XXX --no-spec`

creates module, controller, service without test files
