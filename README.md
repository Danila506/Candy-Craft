# Candy Craft

Интернет-магазин тортов «Candy Craft» с витриной товаров, корзиной и оформлением заказа. Проект состоит из фронтенда на React (Vite) и бэкенда на NestJS с PostgreSQL/Prisma. Есть демо-админка для управления каталогом.

## Возможности

- Каталог и карточки товаров с изображениями.
- Корзина и оформление заказа.
- Регистрация/авторизация пользователей.
- Swagger-документация API.
- Демо-админка (локальная авторизация через LocalStorage).

## Стек

**Frontend:** React, Vite, Tailwind CSS, Ant Design, React Router.

**Backend:** NestJS, Prisma, PostgreSQL, JWT, Multer.

## Требования

- Node.js 20.x
- npm
- PostgreSQL

## Быстрый старт

1. Установите зависимости:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

2. Создайте файл `backend/.env` и задайте переменные окружения:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
PORT=3000

# JWT для защищённых роутов (используются в middleware)
JWT_SECRET=replace_me
JWT_EXPIRES_IN=7d

# Токены авторизации (используются в AuthService)
JWT_ACCESS_SECRET=replace_me_access
JWT_REFRESH_SECRET=replace_me_refresh
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d
```

3. Примените миграции Prisma:

```bash
cd backend
npx prisma migrate dev
```

4. Запустите сервисы:

```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd ../frontend
npm run dev
```

После запуска:

- Клиент: `http://localhost:5173`
- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api`

## Демо-доступ в админку

Админка использует локальную авторизацию (LocalStorage). Войти можно тестовыми данными:

```
admin@candycraft.ru / admin123
```

## Полезные команды

### Backend

```bash
npm run start:dev
npm run build
npm run start:prod
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```
