# Icy Horizons

Сервис для развития туристической отрасли в РС(Я)

## Описание

Сервер: Express.js, Prisma
Клиент: Next.js, SCSS, Redux

## Установка

```bash
git clone https://github.com/Chermi6267/IcyHorizons.git
cd IcyHorizons
```

```bash
cd server
npm i

npx prisma migrate dev
cd loadDataFromExcelToDb
node saveToDB.js

cd ..
npm run dev
```

```bash
cd client
npm i
npm run dev
```
