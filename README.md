# Getting Started

## Step 1: Clone the repository and run

```bash
# using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Make sure to add your .env and database connection configuration

```bash
# using npm
username = ""
password = ""
host = ""
port = ""
database = ""
sslmode = ""
DATABASE_URL = "mysql://${username}:${password}@${host}:${port}/${database}?ssl-mode=${sslmode}"
```

## Step 3 (Optional and skip to Step 4): If you dont have the prisma migration folder run this command:

```bash
npx prisma migrate dev --name init
```

## Step 4: If you have the prisma migration folder run this command to sync the migration:

```bash
# using npm
npm run prisma:generate

# OR using Yarn
yarn prisma:generate
```

## Step 5: Check your Prisma Studio:

```bash
# using npm
npm run prisma:studio

# OR using Yarn
yarn prisma:studio
```

## Step 6: Lets Run your Application:

```bash
# using npm
npm run devstart

# OR using Yarn
yarn devstart
```

## Tech Stack

-[Prisma](https://www.prisma.io/) 
-[Trpc](https://trpc.io/)
