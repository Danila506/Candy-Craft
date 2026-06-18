# CandyCraft

Full-stack интернет-магазин сладких подарков и кондитерских наборов. В проекте есть публичный каталог, карточка товара, корзина, оформление заказа, личный кабинет, админ-панель, платежи через YooKassa и backend API на NestJS.

## Возможности

- Каталог товаров с категориями, поиском, сортировкой и фильтрами.
- Карточка товара с остатками и добавлением в корзину.
- Корзина с изменением количества и контролем доступного остатка.
- Checkout в несколько шагов: адрес, доставка, дополнительные опции, подтверждение.
- Авторизация по email/password, refresh tokens и Google OAuth.
- Личный кабинет с профилем, адресами и историей заказов.
- Админ-панель для управления товарами, категориями и заказами.
- Резервирование остатков, история статусов заказа и учет движений склада.
- Интеграция YooKassa: создание платежа, возврат пользователя, обработка webhook.
- Swagger-документация backend API.
- Unit/e2e тесты для ключевых backend и frontend сценариев.

## Стек

**Frontend**

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Vitest / Testing Library
- lucide-react, Headless UI, Ant Design

**Backend**

- NestJS 11
- TypeScript
- Prisma 7
- PostgreSQL
- JWT + Passport
- Argon2
- YooKassa
- Swagger
- Jest / Supertest

## Структура

```text
CandyCraft/
├── frontend/             # React/Vite клиент
│   ├── src/components    # Общие UI и layout-компоненты
│   ├── src/pages         # Публичные страницы и checkout
│   ├── src/admin         # Админ-панель
│   ├── src/contexts      # Auth, cart, products, checkout
│   └── src/api           # HTTP-клиент и API helpers
├── backend/              # NestJS API
│   ├── src/auth          # Авторизация, JWT, Google/Yandex/VK OAuth
│   ├── src/products      # Товары
│   ├── src/categories    # Категории
│   ├── src/cart          # Корзина
│   ├── src/orders        # Заказы, опции checkout
│   ├── src/payments      # YooKassa и webhook
│   ├── src/security      # CSRF/origin guard и rate limits
│   └── prisma            # Schema, migrations, seed
└── docs/                 # Рабочие заметки и security docs
```

## Требования

- Node.js 20.x для backend.
- npm.
- PostgreSQL.
- YooKassa credentials для реальных платежей.
- Опционально: Google OAuth и DaData API key.

## Быстрый старт

### 1. Установить зависимости

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Настроить backend environment

Создайте `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/candycraft"
PORT=3000
FRONTEND_URL="http://localhost:5173"

JWT_ACCESS_SECRET="replace-with-long-random-secret"
JWT_REFRESH_SECRET="replace-with-another-long-random-secret"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="30d"

# Optional fallback for older JWT config paths
JWT_SECRET="replace-with-long-random-secret"
JWT_EXPIRES_IN="7d"

# Optional: Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Optional: Yandex OAuth
YANDEX_CLIENT_ID=""
YANDEX_CLIENT_SECRET=""
YANDEX_CALLBACK_URL="http://localhost:3000/auth/yandex/callback"

# Optional: VK OAuth
VK_CLIENT_ID=""
VK_CLIENT_SECRET=""
VK_CALLBACK_URL="http://localhost:3000/auth/vk/callback"
VK_API_VERSION="5.199"

# Email verification SMTP
# Для reg.ru обычно:
# SMTP_HOST="mail.hosting.reg.ru"
# SMTP_PORT=465
# SMTP_SECURE=true
SMTP_HOST=""
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="no-reply@your-domain.ru"
SMTP_PASS="mailbox-password"
SMTP_FROM="CandyCraft <no-reply@your-domain.ru>"

# Optional: address suggestions
DADATA_API_KEY=""

# Optional: YooKassa
YOOKASSA_SHOP_ID=""
YOOKASSA_SECRET_KEY=""
YOOKASSA_RETURN_URL="http://localhost:5173/payment/result"

# Optional: checkout dictionaries
ORDER_DELIVERY_OPTIONS_JSON=""
ORDER_GIFT_OPTIONS_JSON=""

# Optional: webhook security
TRUST_PROXY="loopback"
YOOKASSA_WEBHOOK_ALLOWED_IPS=""
YOOKASSA_WEBHOOK_TRUSTED_PROXY_IPS=""
YOOKASSA_WEBHOOK_RATE_LIMIT_MAX=60
YOOKASSA_WEBHOOK_RATE_LIMIT_WINDOW_MS=60000
YOOKASSA_WEBHOOK_ALERT_THRESHOLD=20
YOOKASSA_WEBHOOK_ALERT_WINDOW_MS=300000
```

### 3. Настроить frontend environment

Создайте `frontend/.env`:

```env
VITE_API_URL="http://localhost:3000"
```

### 4. Подготовить базу данных

```bash
cd backend
npx prisma migrate deploy
npm run db:seed
```

Seed создает тестовые аккаунты:

```text
User:  user@candycraft.test / TestUser123!
Admin: admin@candycraft.test / TestAdmin123!
```

### 5. Запустить проект

Backend:

```bash
cd backend
npm run start:dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Локальные адреса:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api`

## Команды

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

Backend:

```bash
cd backend
npm run start:dev
npm run build
npm run test
npm run test:e2e
npm run db:seed
```

## API и безопасность

- CORS настроен для локального frontend и production-доменов проекта.
- JWT access token передается в `Authorization`, refresh token хранится в cookie.
- Для мутаций используется CSRF/origin guard.
- YooKassa webhook защищен allowlist IP, trusted proxy настройками, rate limit и audit logs.
- Подробности по webhook: [`docs/webhook-security.md`](docs/webhook-security.md).

## Deployment

Frontend рассчитан на SPA-деплой, `frontend/vercel.json` перенаправляет все маршруты на `index.html`.

Backend production start:

```bash
cd backend
npm run build
npm run start:prod
```

`start:prod` применяет Prisma migrations и запускает собранный NestJS сервер.


## License

ISC.
