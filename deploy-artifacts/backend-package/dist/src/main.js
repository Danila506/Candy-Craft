"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const DEFAULT_CORS_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "https://candy-craft.ru",
  "https://www.candy-craft.ru",
  "https://candy-craft.vercel.app",
  "https://candy-craft.onrender.com",
];
function parseOrigins(value) {
  return (value || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
}
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  app.set("trust proxy", process.env.TRUST_PROXY || "loopback");
  app.use((0, cookie_parser_1.default)());
  const corsOrigins = Array.from(
    new Set([
      ...DEFAULT_CORS_ORIGINS,
      ...parseOrigins(process.env.FRONTEND_URL),
      ...parseOrigins(process.env.CORS_ALLOWED_ORIGINS),
    ]),
  );
  app.enableCors({
    origin: corsOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders:
      "Content-Type, Authorization, Accept, Idempotency-Key, idempotency-key",
  });
  app.useGlobalPipes(
    new common_1.ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const config = new swagger_1.DocumentBuilder()
    .setTitle("Online Store API")
    .setDescription("API для интернет-магазина")
    .setVersion("1.0")
    .addTag("products")
    .addTag("categories")
    .build();
  const document = swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup("api", app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map
